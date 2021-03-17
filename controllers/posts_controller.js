const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res) {

    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back')
    }catch(err) {
        console.log('Error',err);
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
            return res.redirect('back');
        }else {
            return res.redirect('back');
        }
    }catch(err) {
        console.log('Error',err);
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