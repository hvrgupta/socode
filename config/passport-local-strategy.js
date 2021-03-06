const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
// authentication using passport 
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done) {
        // Find a user and establish the identity
        User.findOne({email},function(err,user) {
            if(err) { 
                console.log('error in finding user -> passport');
                return done(err);
            }
            if(!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null,false);
            }

            return done(null,user);
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

module.exports = passport;