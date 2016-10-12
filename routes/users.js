'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const users_app = require('../modules/users_app');


router.get('/:user_id/posts', (req,res)=>{
  users_app.users.posts.all(req.params.user_id);

});
router.get('/signup', (req,res)=>{
  res.render('signup');
});

router.get('/login', (req,res)=>{
  res.render('login');

});


router.get('/:id', (req, res, next) => {
  users_app.users.get.byID(req.params.id)
    .then((users) => {
      res.render('./user-posts', {posts:[]});

    });
});

router.get('/', (req, res, next) => {
  console.log(req.locals);
  users_app.users.get.all()
    .then((users) => {
      res.render('./login', users);
    });
});


router.post('/login', (req, res, next) => {
  let newUser = {
    username: req.body.username,
    email: req.body.email
  };

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      newUser.password = hash;
      users_app.users.set.new(newUser)
        .then((row) => {
          res.locals.currentUser = row[0];
          res.locals.loggedIn = true;
          req.session.currentUser = row[0];
          req.session.loggedIn = true;

          res.redirect('/index');
        });
    });
});






module.exports = router;
