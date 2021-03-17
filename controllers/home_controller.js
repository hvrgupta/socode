const Post = require('../models/post');
const User = require('../models/user');

// module.exports.home = function(req,res) {
//     // logging cookies
//     // console.log(req.cookies);
//     // // Altering Cookie
//     // res.cookie('user_id',25);
//     // console.log(req);
//     // Post.find({},function(err,posts) {
//     //     if(err) {console.log('err'); return;}

//     //     return res.render('home',{
//     //         title: 'Home',
//     //         posts: posts
//     //     });
//     // })
    
//     // Populating the user of each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err,posts) {

//         User.find({},function(err,users) {
//             return res.render('home',{
//                 title: 'Home',
//                 posts: posts,
//                 all_users: users
//             });
//         })

//     })
// }

// above code is old code new optimized code below with async / await

module.exports.home = async function(req,res) {

    try {
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        
        let users = await User.find({});

        return res.render('home',{
        title: 'Home',
        posts: posts,
        all_users: users
        })
    }
    catch(err) {
        console.log('Error',err);
        return;
    }
    
}

module.exports.about = function(req,res) {
    return res.end('<h1>About Me</h1>');
}

// module.export.actionName = function(req,res) {}