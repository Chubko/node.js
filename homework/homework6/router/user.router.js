const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.isUserValid, userController.createUser);

router.get('/:userId', userMiddleware.isIdValid, authMiddleware.checkAccessToken, userController.findUserById);

router.put('/:userId', userMiddleware.isIdValid, authMiddleware.checkAccessToken, userController.updateUserById);

router.delete('/:userId', authMiddleware.checkAccessToken, userController.deleteUserById);

module.exports = router;
