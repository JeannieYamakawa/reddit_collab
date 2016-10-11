'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

router.get('/users', function(req, res) {
  knex('users')
    .then((users) => {
      res.json(users);

    });
});


router.get('/', (req, res, next) => {
  app.users.get.all()
    .then((users) => {
      res.render('../pages/users', users);
      next();
    });
});

router.get('/:id', (req, res, next) => {
  app.users.get.byID(req.params.id)
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
      app.users.set.new(newUser)
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




var app = {
  users: {
    get: {
      all: function() {
        return knex('users')
          .select(['id', 'username', 'email'])
          .orderBy('id');

      },
      byID: function(user_id) {
        return knex('users')
          .select(['id', 'username', 'email'])
          .first()
          .where({
            id: user_id
          });
      },
      byUsernameOrEmailWithHash: function(user_login) {
        return knex('users')
          .select(['id', 'username', 'email', 'password'])
          .first()
          .where({
            email: user_login
          })
          .OrWhere({
            username: user_login
          });
      }
    }
  }
};


module.exports = router;
