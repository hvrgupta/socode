const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socode_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting to mongodb"));

db.once('open',function() {
    console.log('Connected to Database :: MongoDB');
})

module.exports = db;
