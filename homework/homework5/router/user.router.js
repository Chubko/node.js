const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.isUserValid, userController.createUser);

router.get('/:userId', userMiddleware.isIdValid, userController.findUserById);

router.put('/:userId', userMiddleware.isIdValid, userController.updateUserById);

router.delete('/:userId', userMiddleware.isIdValid, userController.deleteUserById);

module.exports = router;
