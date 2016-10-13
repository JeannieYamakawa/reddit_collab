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
    console.log(posts);
    res.render('posts', {
      posts: posts,
      session: session,
    })
  })
})

//
router.get('/users/:user_id/posts/:post_id', (req, res, next) => {
  let postID = req.params.id;
  knex('posts').where('posts.id', postID).innerJoin('comments', 'posts.id',
    'comments.post_id').then((post) => {
    res.render('single-post', {
      post: post
    })
  })
})

router.get('/users/:user_id/posts/:post_id/edit', (req, res, next) => {
  let postID = req.params.id;
  knex('posts').where('id', postID).first().then((post) => {
    res.render('edit-post', {
      post: post
    })
  })
})

router.post('/users/:user_id/posts', authorizedUser, (req, res, next) => {
  knex('posts').insert({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user.id
  }).then((post) => {
    res.redirect('/posts');
  })
})

router.post('/users/:user_id/posts/:post_id/comments', authorizedUser, (req, res, next)=>{
  let postID = req.params.id;
  knex('comments').insert({
    content: req.body.content,
    user_id: req.session.user.id,
    post_id: postID
  }).then((comment)=>{
    res.redirect('/posts/' + postID)
  })
})



module.exports = router;
