const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

// Static Files
app.use(express.static('assets'));

// Express Layout
app.use(expressLayouts);

// extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)

//use express router
app.use('/',require('./routes/index'));

//Setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,(err) => {
    if(err) {
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running successfully at ${port}`);
})