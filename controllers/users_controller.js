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

//Get the sign up data

module.exports.create = function(req,res) {
    //TODO Later
}

//Sign in and create session for the user   

module.exports.createSession = function(req,res) {
    //ToDO Later
}