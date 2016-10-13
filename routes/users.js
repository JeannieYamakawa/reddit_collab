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
    var thisUsersPosts =[];
    var thisUsersComments=[];
    var userName;
    let session = req.session;
    knex('users').innerJoin('posts', 'users.id', 'posts.user_id').then(function(data){
        for(let i=0; i<data.length; i++){
            if(data[i].user_id == userId){
                thisUsersPosts.push(data[i])
            }
        }
        userName =  thisUsersPosts[0].username;
    })
    .then(knex('users').innerJoin('comments', 'users.id', 'comments.user_id').then(function(data2){
        for (let j=0; j<data2.length; j++){
            if(data2[j].user_id == userId){
                thisUsersComments.push(data2[j])
            }
        }
      res.render('./user-posts', {thisUsersPosts: thisUsersPosts, thisUsersComments:thisUsersComments, userName: userName, session: session})
  })
)
});



// GET /users/:user/edit
//page with form for editing user information
router.get('/users/:user_id/edit',function(req,res){
    var userRequestingEdit = req.params.user_id;
    var wholeUser = req.session;
    //why is my session empty?
    var userLoggedIn = wholeUser.userId;
    var userCurrentPassword;
    console.log(wholeUser);
    if (userRequestingEdit == userLoggedIn){
    knex('users').where('id', userLoggedIn)
        .then(function(data){
            userCurrentPassword = data.password;
            res.render('./user-edit', {wholeUser:wholeUser, userCurrentPassword:userCurrentPassword})
        })
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
