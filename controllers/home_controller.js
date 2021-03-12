const Post = require('../models/post');

module.exports.home = function(req,res) {
    // logging cookies
    // console.log(req.cookies);
    // // Altering Cookie
    // res.cookie('user_id',25);
    // console.log(req);
    let userPosts;
    Post.find({user: req.user._id},function(err,posts) {
        if(err) {console.log('err'); return;}
        userPosts = posts;

        // console.log(userPosts);
        return res.render('home',{
            title: 'Home',
            posts: userPosts
        });
    })
}

module.exports.about = function(req,res) {
    return res.end('<h1>About Me</h1>');
}

// module.export.actionName = function(req,res) {}