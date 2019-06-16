module.exports = (app) => {
    const UserController = require('../controllers/UserController.js');
    const middleware = require('../../middleware.js');

    app.post('/users', UserController.create);
    app.post('/users/login', UserController.login);
    app.post('/users/protected', middleware.checkToken, (req, res) => {
        res.json({ authData: req.authData });
    })
};