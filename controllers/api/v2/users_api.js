module.exports.index = function(req,res) {
    res.status(200).json({
        data: {
            name: 'abc',
            contact: '123456'
        },
        message: 'List of Users'
    })
}