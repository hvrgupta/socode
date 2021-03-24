const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport 
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req,email,password,done) {
        // Find a user and establish the identity
        User.findOne({email},function(err,user) {
            if(err) { 
                req.flash('error',err);
                return done(err);
            }
            if(!user || user.password != password) {
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }

            return done(null,user); // sending user to req 
        })
    }
));

// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done) { // Encryption of id    
    done(null,user.id);
})

passport.deserializeUser(function(id,done) {
    User.findById(id, function(err,user) {
        if(err) { 
            console.log('error in finding user -> passport');
            return done(err);
        }

        return done(null,user); 
    })
})

//Check if user is authenticated

passport.checkAuthentication = function(req,res,next) {
    // If the user is signed in pass on request to the next function(controller's action) 
    if(req.isAuthenticated()) {
         return next();
     } 
     
     //If the user is not signed in
     return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next) {
    if(req.isAuthenticated()) {
        // req.user contains the current signed in user in session cookie
        // and we are just sending this to the locals for the views
         res.locals.user = req.user;   
    }
    next();
}

module.exports = passport;