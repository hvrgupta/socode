module.exports.home = function(req,res) {
    return res.end('<h1>Express up for SoCode!');
}

module.exports.about = function(req,res) {
    return res.end('<h1>About Me</h1>');
}

// module.export.actionName = function(req,res) {}