'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

// router.get('/users/:id/comments/new', function(req, res) {
//   var userID = req.params.id;
//   res.render("comments/new", {
//     userID: userID
//   });
// });
//
// router.post('/users/:id/comments/new', function(req, res) {
//   var userID = req.params.id;
//   var cookieUserID = Number.parseInt(req.session.user.id);
//   knex('comments').insert({
//     content: req.body.content,
//     post_id: knex.select('id').from('posts').where('id', userID),
//     user_id: knex.select('id').from('users').where('id', cookieUserID)
//   }).then(function(users) {
//     res.redirect('/posts');
//   }).catch(function(err) {
//     console.log(err);
//   });
// });
//
// router.get('/users/:id/comments', function(req, res) {
//   var userID = Number.parseInt(req.session.user.id);
//   knex('comments').then(function(comments) {
//     knex('posts').innerJoin('comments', 'posts.id', 'comments.post_id')
//       .where('comments.user_id', '=', userID)
//       .then(
//         function(info) {
//           res.render('comments/u-single-thread', {
//             info: info,
//             userID: userID
//           });
//         }).catch(function(err) {
//         console.log(err);
//       });
//   });
// });
//
// router.get('/posts/:id/comments', function(req, res) {
//   var userID = req.params.id;
//   knex('posts').where('id', '=', userID).then(function(postInfo) {
//     knex('users').innerJoin('comments', 'users.id',
//       'comments.user_id').where('post_id', '=', userID).then(function(
//       info) {
//       res.render("comments/c-single-thread", {
//         postInfo: postInfo,
//         info: info
//       });
//     });
//   });
// });
//
// router.get('/comments/:id/edit', function(req, res) {
//   knex('comments').where({
//     id: req.params.id
//   }).first().then(function(comment) {
//     res.render('comments/edit', {
//       comment: comment
//     });
//   }).catch(function(err) {
//     console.log(err);
//   });
// });
//
// router.patch('/comments/:id', function(req, res) {
//   var userID = Number.parseInt(req.session.user.id);
//   knex('comments').where({
//     id: req.params.id
//   }).update({
//     content: req.body.content
//   }).then(function() {
//     res.redirect('/users/' + userID + '/comments');
//   }).catch(function(err) {
//     console.log(err);
//   });
// });
//
// router.delete('/comments/:id', function(req, res) {
//   var userID = Number.parseInt(req.session.user.id);
//   knex('comments').where({
//     id: req.params.id
//   }).del().then(function() {
//     res.redirect('/users/' + userID + '/comments');
//   }).catch(function(err) {
//     console.log(err);
//   });
// });
//
// module.exports = router;
