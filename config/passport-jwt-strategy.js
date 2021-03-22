const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'socode'
}

passport.use(new JwtStrategy(opts,function(jwtPayload, done) { // function reads data from jwt payload
    
    User.findById(jwtPayload._id,function(err,user) {
        if(err) { console.log('Error in finding user from JWT'); return;}

        if(user) {
            return done(null,user); // null -- error not present
        }else{ 
            return done(null,false); // false -- user not found
        }

    });
}));

module.exports = passport;