const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();

const port=3000;

const expessLayouts= require('express-ejs-layouts');

const db=require('./config/mongoose');
//reading through the post requests
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expessLayouts);

//using expressLayouts to insert css and script tag in proper place in ejs file
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//accesing route middleware
app.use('/',require('./routes'));

//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err)
    {
        console.log('Error in running the server: ',err);
    }
    else
    {
        console.log(`Server is running on port: ${port}`);
    }
});