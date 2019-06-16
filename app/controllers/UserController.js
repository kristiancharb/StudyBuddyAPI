const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const config = require('../../config.js');

exports.create = async (req, res) => {    
    //validate request 
    const isFieldMissing = !req.body.username || !req.body.email ||
                           !req.body.password || !req.body.fullname;
    if(isFieldMissing) {
        return res.status(400).send('Missing field');
    }
    try {
        const duplicateUser = await User.findOne({ 
            $or: [
                { username: req.body.username },
                { email: req.body.username }
            ]
        });
        if(duplicateUser) {
            return res.status(409).send('Email and username must be unique');
        }
    } catch(error) {
        console.log('Error while querying DB')
        res.status(500).send(err);
    }
    const user = new User(req.body);
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        user.password = hash;
    } catch(error) {
        console.log('Error while hashing password')
        res.status(500).send(err);
    }
    try {
        //store in db
        const saved = await user.save();
        res.json({
            id: saved._id
        });
    } catch (error) {
        console.log('Error while saving to DB')
        res.status(500).send(err);
    }
};

exports.login = async (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).send('Missing field');
    }

    try {
        const user = await User.findOne({ username: req.body.username });
        if(!user) {
            res.status(400).send('Username does not exist');
        }
        const match = bcrypt.compareSync(req.body.password, user.password);
        if(match) {
            delete user.courses;
            const token = jwt.sign({ user }, config.secret);
            res.json({ token });
        } else {
            res.status(400).send('Incorrect password');
        }
    } catch(error) {
        console.log('Error while querying DB')
        res.status(500).send(error);
    }
}