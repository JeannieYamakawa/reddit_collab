'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

<<<<<<< HEAD
router.get('/', (req, res, next) => {
  knex('users').innerJoin('posts', 'users.id', 'posts.user_id').then((posts) => {
    res.render('posts', {
      posts: posts
    })
  })
})
=======
function authorizedUser(req, res, next) {
  let loggedInUser = req.session.user;
  if(loggedInUser){
    next();
  } else {
    res.send('restricted')
  }
}

router.get( '/', ( req, res, next ) => {
    knex( 'users' ).innerJoin('posts', 'users.id', 'posts.user_id').then( ( posts ) => {
        res.render( 'posts', {
            posts: posts
        } )
    } )
} )
>>>>>>> 719c73153751ee1974659c0178d8e04c015f3feb

router.get('/:id', (req, res, next) => {
  let postID = req.params.id;
  knex('posts').where('posts.id', postID).innerJoin('comments', 'posts.id',
    'comments.post_id').then((post) => {
    res.render('single-post', {
      post: post
    })
  })
})

router.get('/:id/edit', (req, res, next) => {
  let postID = req.params.id;
  knex('posts').where('id', postID).first().then((post) => {
    res.render('edit-post', {
      post: post
    })
  })
})

router.post('/', authorizedUser, (req, res, next) => {
  knex('posts').insert({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user.id
  }).then((post)=>{
    res.redirect('/posts');
  })
})



module.exports = router;
