const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/index.js');

// create express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Configure the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to StudyBuddy."});
});

//add additional routes
require('./app/routes/UserRoutes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});