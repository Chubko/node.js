const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.isUserValid, userController.createUser);

router.get('/:userName', userController.getUserByName);

router.delete('/:userName', userController.deleteUser);

module.exports = router;
