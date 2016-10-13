/*jshint esversion:6*/

'use strict';


const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const users_app = require('../modules/users_app');


router.get('/signup', (req,res)=>{
    res.render('pages/signup', {
      signupMessage : '',
  });
});

//GET login page
router.get('/login', (req, res, next) => {
        res.render('pages/login', {
            loginMessage : "",
        });
    });

//authenticate and begin tracking session
router.post('/login', (req, res, next) => {
    knex('users')
    .where('username', req.body.username)
    .first()
    .then((user) => {

        if(!user) {
            return res.render('pages/login', {
                loginMessage : "invalid login info",
            });
        }

        bcrypt.compare(req.body.password, user.password)
          .then(function () {
            console.log('worked');
            req.session.user = user;
            res.cookie('loggedIn', true);
            res.redirect('/posts');
          }, function () {
            console.log('failed');
            res.redirect('back');
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
