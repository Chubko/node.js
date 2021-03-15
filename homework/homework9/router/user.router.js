const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, fileMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);

router.post(
    '/',
    userMiddleware.isUserValid,
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userController.createUser
);

router.use('/:userId', userMiddleware.isIdValid, authMiddleware.checkAccessToken);

router.get('/:userId', userController.findUserById);

router.put(
    '/:userId',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userController.updateUserById
);

router.delete('/:userId', userController.deleteUserById);

module.exports = router;
