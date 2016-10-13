'use strict';

const express = require('express');
const router = express.Router({mergeParams: true});
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


//show a single post page
router.get('/posts/:post_id', (req, res, next) => {
  let postID = req.params.post_id;
  knex('users').where('posts.id', postID).innerJoin('posts', 'users.id', 'posts.user_id').first().then((post) => {
    knex('comments').where('post_id', postID).innerJoin('users', 'comments.user_id', 'users.id').then((comments) =>{
      console.log("post", post);
      console.log("comments", comments);
      res.render('single-post', {
        post: post,
        comments: comments
      })
    })
  })
})

//show edit page for a post
router.get('/posts/:post_id/edit', (req, res, next) => {
  let postID = req.params.post_id;
  knex('users').where('posts.id', postID).innerJoin('posts', 'users.id', 'posts.user_id').first().then((post) => {
    res.render('edit-post', {
      post: post
    })
  })
})

//create a new post
router.post('/posts', authorizedUser, (req, res, next) => {
  knex('posts').insert({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user.id
  }).then((post) => {
    res.redirect('/posts');
  })
})

//add a comment to a post
router.post('/posts/:post_id/comments', authorizedUser, (req, res, next)=>{
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
router.patch('/posts/:post_id/', (req, res, next) => {
  let postID = req.params.post_id;
  let userID = req.params.user_id;
  knex('posts').where('posts.id', postID).update({
    body: req.body.body,
    title: req.body.title
  }).then(() =>{
    res.redirect('/users/' + userID + '/posts/' + postID);
  })
});


//delete a post
router.delete('/posts/:post_id/', (req, res, next) => {
  let postID = req.params.post_id;
  let userID = req.params.user_id;
  knex('posts').where('posts.id', postID).del().then(() =>{
    res.redirect('/users/' + userID);
  })
});



module.exports = router;
