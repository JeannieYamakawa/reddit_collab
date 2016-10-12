/*jshint esversion:6*/

'use strict';


const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const methodOverride = require('method-override');


//Handles login and authentication
router.get('/login', (req, res, next) => {
        res.render('pages/login', {
            loginMessage : "",
        });
    });


router.post('/login', (req, res, next) => {
    knex('users')
    .where('email', req.body.credential)
    .orWhere('username', req.body.credential)
    .first()
    .then((user) => {
        if(!user) {
            return res.render('pages/login', {
                loginMessage : "invalid login info",
            });
        }
        bcrypt.compare(req.body.credential, user.password)
        .then((result) => {
            if(result) {
                req.session('loggedIn', true);
                return res.redirect('/posts');
            }
            res.render('/login', {
                loginMessage : "invalid login info",
            });
        });
    });
});

//handles logout users
router.get('/logout', (req, res) => {
    req.session = null;
    //redirect to the login page
    res.redirect('/');
});

module.exports = router;
