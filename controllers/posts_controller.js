const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res) {

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        let post_find = await Post.findById({_id: post._id}).populate('user','-password');
        // console.log(post_find); 
        // AJAX sending response to user
        if(req.xhr) {
            
            return res.status(200).json({
                data: {
                    post: post_find
                },
                message: "Post created!"
            });
        }
        req.flash('success','Post Created!');
        
        return res.redirect('back')
    }catch(err) {
        req.flash('error',err);
        return;
    }
    // Post.create({
    //     content: req.body.content,
    //     user: req.user._id
    // },function(err,newPost) {
    //     if(err) { console.log('Error in creating New Post'); return;}
    //     return res.redirect('back');    
    // });
}

module.exports.destroy = async function(req,res) {

    try {
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            if(req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'Post deleted'
                })
            }
            req.flash('success','Post Removed!');
            return res.redirect('back');
        }else {
            return res.redirect('back');
        }
    }catch(err) {
        req.flash('error',err);
        return;
    }


    // Post.findById(req.params.id,function(err,post) {
    //     if(err) { console.log('error in getting post'); return;}
    //     // .id means converting the ObjectId into String
    //     if(post.user == req.user.id) {
    //         post.remove();

    //         Comment.deleteMany({post: req.params.id},function(err) {
    //             return res.redirect('back');
    //         });
    //     }else {
    //         return res.redirect('back');
    //     }
    // });
}