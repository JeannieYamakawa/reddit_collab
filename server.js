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
    keys: ['key1', 'key2'],
}));
app.use(methodOverride('_method'));

//use as second argument whenever a user needs to be authenticated and logged in to view

const checkAuth = function(req, res, next) {
    if (Number.parseInt(req.session.user.id) !== Number.parseInt(req.params.user_id)) {
        return res.send("YOU AIN'T SUPPOSED TO BE HERE")
    }
    next();
};

// Shows all the posts from all users
app.get('/', (req, res, next) => {
    knex('users').innerJoin('posts', 'users.id', 'posts.user_id')
        .then((posts) => {
            console.log(posts);
            res.render('pages/index', {
                posts: posts,
                session: req.session
            });
        })
});

// Declare routes variables
const users = require('./routes/users');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const comments = require('./routes/comments');
const comments = require('./routes/votes');

app.use((req, res, next) => {
    console.log('req.session', req.session.username);
    res.locals.currentUser = req.session.currentUser || null;
    res.locals.loggedIn = req.session.loggedIn || false;
    next();
});

// Assign Routes to Server
app.use(auth);
app.use(users);
app.use('/users/:user_id/posts', posts);
app.use('/users/:user_id/posts/:post_id', comments);
app.use(votes);

const port = process.env.PORT || 3000;
// Server Listener
app.listen(port, function() {
    console.log(process.env.NODE_ENV, 'listening on port: ' + port);
});

module.exports = app;



// SET SESSION SECRET
// bash -c 'echo "SESSION_SECRET="$(openssl rand -hex 64)' >> .env
