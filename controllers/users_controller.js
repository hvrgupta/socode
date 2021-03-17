const User = require('../models/user');

module.exports.profile = function(req,res) {

    User.findById(req.params.id,function(err,user) {
        if(user) {
            return res.render('user_profile',{
                title: 'Profile',
                profile_user: user
            });
        }
    });
}   

module.exports.update = function(req,res) {
    if(req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user) {
            return res.redirect('back'); 
        });
    }else {
        return res.status(401).send('<h1>Unauthorized</h1>');
    }
}

module.exports.signUp = function(req,res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'SoCode | Sign Up'
    });
}

module.exports.signIn = function(req,res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
        // console.log(req);
    }
    return res.render('user_sign_in',{
        title: 'SoCode | Sign In'
    })
    
}

//Get the sign up data

module.exports.create = function(req,res) {
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
    User.findOne({email: req.body.email}, function(err,user) {
        if(err) {console.log('error in finding user in signing up'); return}

        if(!user) {
            User.create(req.body,function(err,newUser) {
                if(err) { console.log('err in creating new user'); return}

                res.redirect('/users/sign-in');
            })
        }else{
            res.redirect('back')
        }
    })
}

//Sign in and create session for the user   

module.exports.createSession = function(req,res) {
    return res.redirect('/')
}

module.exports.destroySession = function(req,res) {
    req.logout(); //Sign out functionality provided by passport js

    return res.redirect('/');
}

