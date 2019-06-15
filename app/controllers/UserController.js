const User = require('../models/User.js');

exports.create = async (req, res) => {    
    try {
        //validate request 
        const isFieldMissing = !req.body.username || !req.body.email ||
                               !req.body.password || !req.body.fullname;
        if(isFieldMissing) {
            return res.status(400).send({
                message: 'missing field'
            });
        }
        
        const duplicateUser = await User.findOne({ 
            $or: [
                { username: req.body.username },
                { email: req.body.username }
            ]
        });
        if(duplicateUser) {
            return res.status(409).send({
                message: 'email and username must be unique'
            });
        }

        //store in db
        const user = new User(req.body);
        const saved = await user.save();
        res.json({
            id: saved._id
        });
    } catch (error) {
        res.status(500).send(err);
    }
};