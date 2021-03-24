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
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo').default;
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash'); 
const customMware = require('./config/middleware');

// OAuth ClientID : 317526409336-aek71jsdnu647a770v85ogksh68vtc0v.apps.googleusercontent.com
// OAuth ClientSecret: 3Kf2eRroepIkW-aRoOsFzY-Y

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true, // To see error in console
    outputStyle: 'extended', // css code to be shown in multiple lines
    prefix: '/css' // where to look for css file 
}))

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

//make the upload path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));

//Setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

// MongoStore used to store the session cookie in the db
// Setting up middleware for cookie encryption
app.use(session({
    name: 'Socode',
    // Todo change the secret before deployment in production mode
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            dbName: 'socode_development',
            autoRemove: 'disabled',
            mongoUrl: 'mongodb://localhost/socode_development',
            function(err) {
                console.log(err || 'connect-mongo setup ok')
            }
            
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//Flash set up after session cookie as it is stored in cookie

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes/index'));

app.listen(port,(err) => {
    if(err) {
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running successfully at ${port}`);
})