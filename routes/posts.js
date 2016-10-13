'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

function authorizedUser(req, res, next) {
  let loggedInUser = req.session.user;
  if (loggedInUser) {
    next();
  } else {
    res.send('restricted')
  }
}

//show all posts
router.get('/posts', (req, res, next) => {
  let session = req.session;
  knex('users').innerJoin('posts', 'users.id', 'posts.user_id').then((posts) => {
    res.render('posts', {
      posts: posts,
      session: session,
    })
  })
})

//show a single post page
router.get('/users/:user_id/posts/:post_id', (req, res, next) => {
  let postID = req.params.post_id;
  knex('posts').where('posts.id', postID).innerJoin('users', 'posts.user_id', 'users.id').first().then((post) => {
    knex('comments').where('post_id', postID).innerJoin('users', 'comments.user_id', 'users.id').then((comments) =>{
      res.render('single-post', {
        post: post,
        comments: comments
      })
    })
  })
})

//show edit page for a post
router.get('/users/:user_id/posts/:post_id/edit', (req, res, next) => {
  let postID = req.params.post_id;
  knex('posts').where('id', postID).innerJoin('users', 'posts.user_id', 'users.id').then((post) => {
    console.log(post);
    res.render('edit-post', {
      post: post
    })
  })
})

//create a new post
router.post('/users/:user_id/posts', authorizedUser, (req, res, next) => {
  knex('posts').insert({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user.id
  }).then((post) => {
    res.redirect('/posts');
  })
})

//add a comment to a post
router.post('/users/:user_id/posts/:post_id/comments', authorizedUser, (req, res, next)=>{
  let postID = req.params.post_id;
  knex('comments').insert({
    content: req.body.content,
    user_id: req.session.user.id,
    post_id: postID
  }).then((comment)=>{
    res.redirect('/posts/' + postID)
  })
})


//edit a posts
router.patch('/users/:user_id/posts/:post_id/', (req, res, next) => {
  let postID = req.params.post_id;
  let userID = req.params.user_id;
  knex('posts').where('post.id', postID).update({
    content: req.body.content,
    title: req.body.title
  }).then(() =>{
    res.redirect('/users/' + userID + '/posts/' + postID);
  })
});


//delete a post


module.exports = router;
