module.exports.profile = function(req,res) {
    res.render('users',{
        title: 'Profile'
    })
}   

module.exports.notification = function(req,res) {
    res.render('users',{
        title: 'Notifications'
    })
}

module.exports.signUp = function(req,res) {
    return res.render('user_sign_up',{
        title: 'SoCode | Sign Up'
    });
}

module.exports.signIn = function(req,res) {
    return res.render('user_sign_in',{
        title: 'SoCode | Sign In'
    })
}