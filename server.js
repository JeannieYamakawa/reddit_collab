/* jshint esversion:6 */

'use strict';

const express = require('express');
const app = express();
const knex = require('./knex');

app.disable('x-powered-by');

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt-as-promised');
const methodOverride = require('method-override');


const ejs = require('ejs');
// Middleware
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
// app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys : ['key1', 'key2'],
}));
app.use(methodOverride('_method'));

//use as second argument whenever a user needs to be authenticated and logged in to view

const checkAuth = function(req, res, next) {
  if (!req.session) {
    return res.redirect('/');
  }
  next();
};

// Declare routes variables
const users = require('./routes/users');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const comments = require('./routes/comments');

app.use((req,res,next)=>{
  console.log('req.session',req.session.username);
  res.locals.currentUser = req.session.currentUser || null ;
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
});

// Assign Routes to Server
app.use(auth);
app.use(users);
app.use(posts);
app.use(comments);
app.get('/', (req, res, next) => {
  res.render('pages/index');

});

const port = process.env.PORT || 3000;
// Server Listener
app.listen(port, function() {
  console.log(process.env.NODE_ENV, 'listening on port: ' + port);
});

module.exports = app;



// SET SESSION SECRET
// bash -c 'echo "SESSION_SECRET="$(openssl rand -hex 64)' >> .env
