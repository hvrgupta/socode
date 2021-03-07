const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// Static Files
app.use(express.static('assets'));
// Cookie Parser
app.use(cookieParser());

app.use(express.urlencoded());
// Express Layout
app.use(expressLayouts);

// extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)

//Setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

// Setting up middleware for cookie encryption
app.use(session({
    name: 'Socode',
    // Todo change the secret before deployment in production mode
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes/index'));

app.listen(port,(err) => {
    if(err) {
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running successfully at ${port}`);
})