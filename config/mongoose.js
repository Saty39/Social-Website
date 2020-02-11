const mongoose=require('mongoose');

//given in documentation
mongoose.connect('mongodb://localhost/codeial_development',{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});

//checking for connection
const db=mongoose.connection;


db.on('error',console.error.bind(console, "error Connecting to MongoDb"));


db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports =db;