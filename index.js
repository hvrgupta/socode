const express = require('express');
const app = express();
const port = 8000;

app.get('/',function(req,res) {
    return res.end('<h1>Hello</h1>')
})

app.listen(port,(err) => {
    if(err) {
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running successfully at ${port}`);
})