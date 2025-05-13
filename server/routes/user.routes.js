const { authenticate } = require('../config/jwt.config');
const UserController = require('../controllers/user.controller');
const { isAdmin } = require("../config/admin.middleware")
module.exports = function(app){
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.get('/api/logout', UserController.logout);
    app.get('/api/users', authenticate, isAdmin ,UserController.getAllUsers);
    app.get('/api/users/:id', authenticate, isAdmin, UserController.getOneUser)
    app.delete('/api/users/delete', authenticate, isAdmin, UserController.deleteAll)
    app.delete('/api/user/delete/:id', authenticate, isAdmin, UserController.deleteOneUser)
    app.get('/api/auth', authenticate, (req, res) => {
    res.status(200).json({
        verified: true,
        user: req.user
    });
});

}