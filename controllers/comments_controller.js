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

module.exports.destroy = function(req,res) {
    Comment.findById(req.params.id,function(err,comment) {
        if(err) { console.log('error in retrieving comment'); return;}
        
        if(comment.user == req.user.id) {

            Post.findById(comment.post,function(err,post) {
                if(err) { console.log('error in retreving post by comment'); return;}
                // console.log(post);
                post.comments = post.comments.filter(item => {
                    return item != comment.id;
                })
                post.save();
                return res.redirect('back');
            })

            // can also use below short code
            // Post.findByIdAndUpdate(comment.post,{ $pull: {comments: req.params.id} },function(req,res) {
            //     return res.redirect('back');
            // })

            comment.remove();
        }else {
            res.redirect('back');
        }
    });
}