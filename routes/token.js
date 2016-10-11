/*jshint esversion:6*/

'use strict';


const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const methodOverride = require('method-override');


//Handles login and authentication
router.post('/login', (req, res, next) => {
    knex('users')
    .where('email', req.body.credential)
    .orWhere('username', req.body.credential)
    .first()
    .then((user) => {
        if(!user) {
            return res.redirect('/login');
        }
        bcrypt.compare(req.body.credential, user.password)
        .then((result) => {
            if(result) {
                req.session('loggedIn', true);
                return res.redirect('/posts');
            }
            res.redirect('/login');
        });
    });
});

//handles logout users
router.get('/logout', (req, res) => {
    req.session = null;
    res.clearCookie('loggedIn');
    //redirect to the login page
    res.redirect('/login');
});

module.exports = router;
