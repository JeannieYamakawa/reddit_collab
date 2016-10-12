'use strict';

const express = require('express');
const router = express.Router({
  mergeParams: true
});
const knex = require('../knex');

router.get('/comments/new', function(req, res) {
  var userID = req.params.id;
  res.render("comments/new", {
    userID: userID
  }).catch(function(err) {
    console.log(err);
  });
});

router.post('/comments/new', function(req, res) {
  var userID = req.params.id;
  var cookieUserID = Number.parseInt(req.session.user.id);
  knex('comments').insert({
    content: req.body.content,
    post_id: knex.select('id').from('posts').where('id', userID),
    user_id: knex.select('id').from('users').where('id', cookieUserID)
  }).then(function(users) {
    // res.redirect('/posts');
  }).catch(function(err) {
    console.log(err);
  });
});

router.get('/comments/:id/edit', function(req, res) {
  knex('comments').where({
    id: req.params.id
  }).first().then(function(comment) {
    res.render('comments/edit', {
      comment: comment
    });
  }).catch(function(err) {
    console.log(err);
  });
});

router.patch('/comments/:id', function(req, res) {
  var userID = Number.parseInt(req.session.user.id);
  knex('comments').where({
    id: req.params.id
  }).update({
    content: req.body.content
  }).then(function() {
    res.redirect('/users/' + userID + '/comments');
  }).catch(function(err) {
    console.log(err);
  });
});

router.delete('/comments/:id', function(req, res) {
  var userID = Number.parseInt(req.session.user.id);
  knex('comments').where({
    id: req.params.id
  }).del().then(function() {
    res.redirect('/users/' + userID + '/comments');
  }).catch(function(err) {
    console.log(err);
  });
});



module.exports = router;
