'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

router.get('/users', function(req, res) {
    knex('users').then((users) => {
        res.json(users);

    });
});

module.exports = router;
