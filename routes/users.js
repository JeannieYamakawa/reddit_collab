'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const users_app = require('../modules/users_app');


//displays a page of all users
router.get('/users', (req, res, next) => {
  console.log(req.locals);
  users_app.users.get.all()
    .then((users) => {
      res.render('./login', users);
    });
});


//displays all posts by a specific user
router.get('/users/:user_id', (req, res, next) => {
  users_app.users.get.byID(req.params.user_id)
    .then((users) => {
      res.render('./user-posts', {posts:[]});

    });
});











module.exports = router;
