const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    'username': String,
    'email': String,
    'fullname': String,
    'password': String,
    'school': String,
    'gradDate': String,
    'socialMedia': {
       'facebook': String,
       'twitter': String,
       'linkedin': String
    },
    "courses": []
});

module.exports = mongoose.model('User', UserSchema);