/*jshint esversion:6*/

'use strict';


const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const methodOverride = require('method-override');


//GET login page
router.get('/login', (req, res, next) => {
    res.render('login', {
        loginMessage: "",
    });
});

//authenticate and begin tracking session
router.post('/login', (req, res, next) => {
    knex('users')
        .where('email', req.body.credential)
        .orWhere('username', req.body.credential)
        .first()
        .then((user) => {

            if (!user) {
                return res.render('pages/login', {
                    loginMessage: "invalid login info",
                });
            }

            bcrypt.compare(req.body.credential, user.password)
                .then((result) => {
                    if (result) {
                        req.session('loggedIn', true);
                        return res.redirect('/posts');
                    }
                    res.render('/login', {
                        loginMessage: "invalid login info",
                    });
                });
        });
});

//logout
router.get('/logout', (req, res) => {
    req.session = null;
    //redirect to the landing page
    res.redirect('/');
});

module.exports = router;
