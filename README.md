# RESTful App Maker

This is a template I created that will let you in a few steps build the front end and server built for a crud app.

Comes with a customizable login and signup form static page, all necessary middleware and can connect to any database that you wish.

Plus a linked up boiler plate for testing.

Save an hour with RESTful App Maker with a fully connected TDD/BDD Authenticated App.

Follow the steps to get started.

Feel free to submit pull requests!

## Getting Started

Fork and Clone into whatever directory you do that in.

Rename folder to project.

`mv crud_template YOUR_PROJECT`

`cd` into YOUR_PROJECT.

Install Dependencies

```
npm install
```

## PACKAGE.JSON

Name the app in [package.json](package.json)

`"name": "app_name",`

Make yourself the author

`"author": "FIRSTNAME LASTNAME <EMAIL@DOMAIN.COM>",`

Add databases in `knexfile.js`

```
connection: {
            host: '127.0.0.1',
            database: 'INSERT DATABASE HERE'
```

Name your session `server.js`

```
app.use(session({
  name: 'NAME OF PROJECT',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))
```

Create your secret session key and .env file in terminal

```
bash -c 'echo "SESSION_SECRET="$(openssl rand -hex 64)' > .env
```

## Testing

go to the [test folder](test/server_spec.js);

Before you write tests just fill in the Suite headers and sub headers and then in the `it` blocks fill in the user stories for your app

```
 it('User Story 1', (done) => {
     done();
 })
```

##YOU'RE DONE BUILD SOMETHING GREAT!
