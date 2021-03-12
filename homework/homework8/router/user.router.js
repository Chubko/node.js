const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, fileMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);

router.post(
    '/',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userMiddleware.isUserValid,
    userController.createUser
);

router.use('/:userId', userMiddleware.isIdValid, authMiddleware.checkAccessToken);

router.get('/:userId', userController.findUserById);

router.put('/:userId', userController.updateUserById);

router.delete('/:userId', userController.deleteUserById);

module.exports = router;
