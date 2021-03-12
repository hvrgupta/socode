const Post = require('../models/post');

module.exports.create = function(req,res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,newPost) {
        if(err) { console.log('Error in creating New Post'); return;}
        return res.redirect('back');    
    });
}