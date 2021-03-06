const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function(req,res) {

    try {
        const user = await User.findById(req.params.id);

        if(user) {
            return res.render('user_profile',{
                title: 'Profile',
                profile_user: user
            });
        }
    }catch(err) {
        console.log('Error',err);
    }

    // User.findById(req.params.id,function(err,user) {
    //     if(user) {
    //         return res.render('user_profile',{
    //             title: 'Profile',
    //             profile_user: user
    //         });
    //     }
    // });
}   

module.exports.update = async function(req,res) {

    if(req.user.id == req.params.id) { 
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err) {
                if(err) { console.log('Multer Error',err); }
                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file) {

                    if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))) {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    // this is saving the path of the uploaded file into the avatar field of the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
            })
            req.flash('success','Profile Updated!');
            return res.redirect('back');
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        } 
    }
    else {
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
    // if(req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user) {
    //         return res.redirect('back'); 
    //     });
    // }else {
    //     return res.status(401).send('<h1>Unauthorized</h1>');
    // }
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

module.exports.create = async function(req,res) {
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    try {
        let user = await User.findOne({email: req.body.email});

        if(!user) {
            await User.create(req.body);
            req.flash('success','Signed Up Successfully');
            res.redirect('/users/sign-in');
        }else {
            res.redirect('back');
        }
    }catch(err) {
        console.log('Error',err);
    }
    
    // User.findOne({email: req.body.email}, function(err,user) {
    //     if(err) {console.log('error in finding user in signing up'); return}

    //     if(!user) {
    //         User.create(req.body,function(err,newUser) {
    //             if(err) { console.log('err in creating new user'); return}

    //             res.redirect('/users/sign-in');
    //         })
    //     }else{
    //         res.redirect('back')
    //     }
    // })
}

//Sign in and create session for the user   

module.exports.createSession = function(req,res) {
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res) {
    req.logout(); //Sign out functionality provided by passport js
    req.flash('success','Logged out!');
    return res.redirect('/');
}

