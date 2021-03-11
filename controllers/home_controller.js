module.exports.home = function(req,res) {
    // logging cookies
    // console.log(req.cookies);
    // // Altering Cookie
    // res.cookie('user_id',25);
    return res.render('home',{
        title: 'Home'
    });
}

module.exports.about = function(req,res) {
    return res.end('<h1>About Me</h1>');
}

// module.export.actionName = function(req,res) {}