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
router.get('/users/:user_id', (req, res) => {
    var userId = req.params.user_id;
    var thisUsersPosts;
    var thisUsersComments;
    var userName;
    let session = req.session;
    knex('users').where('id',userId).then(function(data){
        userName = data[0].username;
        console.log(userName, "this is the userName");
        knex('posts').where('user_id', userId).then(function(data1){
          thisUsersPosts = data1;
          console.log(data1, "these are the specific user's posts");
          knex('comments').where('user_id', userId).then(function(data2){
            thisUsersComments = data2;
            console.log(data2, "these are the specific user's comments");
            res.render('./user-posts', {thisUsersPosts: thisUsersPosts, thisUsersComments:thisUsersComments, userName: userName, session: session})
          });
        });
    });
});



// GET /users/:user/edit
//page with form for editing user information
router.get('/users/:user_id/edit',function(req,res){
    var userBeingEdited = req.params.user_id;
    var wholeUser = req.session.user;
    console.log(req.session, 'this is the req.session');
    var userLoggedIn = req.session.user.id;
    if (userBeingEdited == userLoggedIn){
        res.render('./user-edit', {wholeUser:wholeUser})
    } else{
    res.sendStatus(401);
    }
})






// PATCH /users/:user
// action for edit user info form\
// allows users to edit their information. this option found on a user show EJS page.
router.patch('/users/:user_id', function(req,res){
    var userId = req.params.user_id;
    var wholeUser = req.body;
    var usernameToChange = wholeUser.username;
    if (userId = req.session.user.id){
        bcrypt.hash(req.body.password, 10).then(function(hashpw){
            knex('users').update({
                username: usernameToChange,
                password: hashpw
            })
            .then(function(){
                res.send('we need an EJS page for this!')
            })
        })
}else{
    res.sendStatus(401);
}
})






// GET /users/:user/delete
// page with confirm button to delete individual user

// PATCH /users/:user
// action for edit user info form\

// DELETE /users/:user
// delete current user




module.exports = router;
