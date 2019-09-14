var express = require('express');
var mongoose = require('mongoose');
var md5 = require('md5');

var port = 8000;
var app = express();
app.use(express.json());

// Set access control for client requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next();
});

// Set static path to run server from
app.use('/', express.static('blog'))

// Run node server
app.listen(port, () => {
    console.log('Server Listening to port ' + port)
});

// Connect to Mongoose
mongoose.connect( "mongodb://localhost:27017/blogpark", {useNewUrlParser: true});

// Create schema for users list 
var Schema = mongoose.Schema;
var users = new Schema({
    username: String,
    name: String,
    email: String,
    password: Object
}, { versionKey: false });
var Users = mongoose.model('Users', users, 'users');

// Check email
app.post('/api/users', (req, res) => {
    Users.find({ email: req.body.email }).then( (doc) => {
        if (doc.length != 0){
            res.status(200).send({
                message: 'found'
            });
        } else {
            res.status(200).send({
                message: 'not found'
            });
        }
    });
});

// Login user api
app.post('/api/login', (req, res) => { 
    Users.find({ email: req.body.email }).then( (doc) => {
        if ( md5(req.body.password) == doc[0].password ) {
            res.status(200).json({
                stat: 200,
                body: doc
            });
        } else {
            res.status(200).json({
                stat: 500
            });
        }
    });
});

// Add user api
app.post('/api/adduser', (req, res) => {
    var addNewUser = new Users({
        username: req.body.name.toLowerCase().replace(/ +/g, ""),
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    });
    addNewUser.save( (err, doc) => {
        if (err) {
            throw err;
        } else {
            return res.status(200).json({ status: 200, message: "success" });
        }
    });
});