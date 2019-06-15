module.exports = (app) => {
    const UserController = require('../controllers/UserController.js');

    app.post('/users', UserController.create);
};