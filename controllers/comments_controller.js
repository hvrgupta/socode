const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res) {
    Post.findById(req.body.post,function(err,post) {
        if(err) { console.log('No Such Post');return;}
        if(post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment) {
                 if(err) { console.log('Error in creating comment') };
                 
                 post.comments.push(comment);
                 post.save(); // When updating the collection you have to use save() to update it..

                 res.redirect('/'); 
            })
        }
    })
}