const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res) {
    
    try {
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password) {
            return res.status(422).json({
                message: 'Invalid username or password'
            })
        }else {
            return res.status(200).json({
                message: 'Sign in successfull, here is your token',
                data: {
                    // jwt.sign(Convert to JSON,key,expiry)
                    token: jwt.sign(user.toJSON(),'socode',{ expiresIn: 10000})
                }
            })
        }

    }catch(err) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }

}