const Comment =  require('../models/comment');
const Post =  require('../models/post');
const Like =  require('../models/like');

module.exports.toggleLike = async function(req,res){
    try{
        // url : likes/toggle/?id=abcd&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        console.log(req.query);
        // check if like already exists
        let existingLike = await Like.findOne({
            // id: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        console.log(existingLike);

        // if like already exists delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else{
            //make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query._id,
                onModel: req.query.type
            })
            likeable.likes.push(newLike._id);
            likeable.save();  
        }

        return res.redirect('back');

        return res.json(200,{
            message: 'Request successfull',
            data: {
                deleted: deleted
            }
        })

    }catch(err){
        console.log(err);
        return res.json(500,{
            message: 'Internal Server Error'    
        });
    }
}