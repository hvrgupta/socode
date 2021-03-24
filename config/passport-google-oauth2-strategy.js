const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use new Strategy for google login
passport.use(new googleStrategy({
    clientID: '317526409336-aek71jsdnu647a770v85ogksh68vtc0v.apps.googleusercontent.com',
    clientSecret: '3Kf2eRroepIkW-aRoOsFzY-Y',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
},
    function(accessToken, refreshToken, profile, done) {
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err) { console.log('error',err); return;}

            console.log(profile);

            if(user) {
                // if found set user as req.user
                return done(null,user);
            }else{
                // if not found create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex') // 20 is length
                }, function(err,user) {
                        if(err) { console.log('error',err); return;}
                        
                        return done(null,user);
                })
            }
        });
    }
));

module.exports = passport;