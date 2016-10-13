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
  res.render('pages/signup', {
  });
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


router.post('/signup', (req, res, next) => {
  console.log(req.body);
  let newUser = {
    username: req.body.username,
    email: req.body.email
  };

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      newUser.password = hash;
      users_app.users.set.new(newUser)
        .then((row) => {
          console.log('user_row',row);

          res.locals.loggedIn=true;
          res.locals.userId=row[0].id;
          res.locals.username=row[0].username;
          res.locals.email=row[0].email;
          res.locals.isAdmin=row[0].admin;


          req.session.loggedIn=true;
          req.session.userId=row[0].id;
          req.session.username=row[0].username;
          req.session.email=row[0].email;
          req.session.isAdmin=row[0].admin;


          console.log('session', req.session);
          console.log('locals', res.locals);
          res.redirect('/posts');
        });
    });
});






module.exports = router;
