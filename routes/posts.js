'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

router.get('/', (req, res, next) => {
  knex('posts').then((posts) =>{

    res.render('posts', {
      posts:posts
    })
  })
})


module.exports = router;
