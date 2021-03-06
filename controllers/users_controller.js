const User = require('../models/user');

module.exports.profile = function(req,res) {
    if(req.cookies.user_id) {
        User.findById(req.cookies.user_id, function(err,user) {
            if(user) {
                return res.render('user_profile',{
                    title: 'Profile',
                    user: user
                })
            }

            return res.redirect('/users/sign-in');
        })
    }else {
        return res.redirect('/users/sign-in');
    }
}   

module.exports.signUp = function(req,res) {
    return res.render('user_sign_up',{
        title: 'SoCode | Sign Up'
    });
    console.log(req);
}

module.exports.signIn = function(req,res) {
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
    // Find the user
    User.findOne({email: req.body.email}, function(err,user) {
        if(err) { console.log('error in finding user in signing in'); return; }
        //Handle User found
        if(user) {
            console.log('user',user.id)
            // Handle password which doesn't match
            if(user.password != req.body.password) {
                return res.redirect('back');
            }
            // Handle Session Creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        } 
        else {
            // User not found
            return res.redirect('back');
        }
    })
}