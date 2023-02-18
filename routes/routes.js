var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);

router.route('/user/search/:id').get(userController.findUserById);

router.route('/user/delete/:id').delete(userController.deleteUserById);

router.route('/user/delete/email/:email').delete(userController.deleteUserByEmail);

router.route('/user/list').get(userController.listAllUsers);
module.exports = router;
