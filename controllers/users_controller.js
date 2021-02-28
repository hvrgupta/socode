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