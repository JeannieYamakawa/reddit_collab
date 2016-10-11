'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const users_app = require('../modules/users_app');

router.get('/users', function(req, res) {
  knex('users')
    .then((users) => {
      res.json(users);

    });
});


router.get('/', (req, res, next) => {
  users_app.users.get.all()
    .then((users) => {
      res.render('../pages/users', users);
      next();
    });
});

router.get('/:id', (req, res, next) => {
  users_app.users.get.byID(req.params.id)
    .then((user) => {
      res.render('../pages/users', users);
      next();
    });
});

router.post('/', (req, res, next) => {
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
          next();
        });
    });
});




module.exports = router;
