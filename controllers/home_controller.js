const Post = require('../models/post');

module.exports.home = function(req,res) {
    // logging cookies
    // console.log(req.cookies);
    // // Altering Cookie
    // res.cookie('user_id',25);
    // console.log(req);
    // Post.find({},function(err,posts) {
    //     if(err) {console.log('err'); return;}

    //     return res.render('home',{
    //         title: 'Home',
    //         posts: posts
    //     });
    // })

    // Populating the user of each post
    Post.find({}).populate('user').exec(function(err,posts) {
        return res.render('home',{
            title: 'Home',
            posts: posts
        });
    })
}

module.exports.about = function(req,res) {
    return res.end('<h1>About Me</h1>');
}

// module.export.actionName = function(req,res) {}