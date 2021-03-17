const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res) {

    try {
        let post = await Post.findById(req.body.post);

        if(post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            res.redirect('/')
        }
    }catch(err) {
        console.log('Error',err);
        return;
    }
    

    // Post.findById(req.body.post,function(err,post) {
    //     if(err) { console.log('No Such Post');return;}
    //     if(post) {
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         },function(err,comment) {
    //              if(err) { console.log('Error in creating comment') };
                 
    //              post.comments.push(comment);
    //              post.save(); // When updating the collection you have to use save() to update it..

    //              res.redirect('/'); 
    //         })
    //     }
    // })
}

module.exports.destroy = async function(req,res) {

    try {
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id) {
            const post = await Post.findById(comment.post);
            post.comments = post.comments.filter(item => {
                return item != comment.id;
            })
            post.save();      
            comment.remove();
            return res.redirect('back');
        }else {
            return res.redirect('back');
        }
    }catch(err) {
        console.log('Error',err);
        return res.redirect('back');
    }
   
    // Comment.findById(req.params.id,function(err,comment) {
    //     if(err) { console.log('error in retrieving comment'); return;}
        
    //     if(comment.user == req.user.id) {

    //         Post.findById(comment.post,function(err,post) {
    //             if(err) { console.log('error in retreving post by comment'); return;}
    //             // console.log(post);
    //             post.comments = post.comments.filter(item => {
    //                 return item != comment.id;
    //             })
    //             post.save();
    //             return res.redirect('back');
    //         })

    //         // can also use below short code
    //         // Post.findByIdAndUpdate(comment.post,{ $pull: {comments: req.params.id} },function(req,res) {
    //         //     return res.redirect('back');
    //         // })

    //         comment.remove();
    //     }else {
    //         res.redirect('back');
    //     }
    // });
}