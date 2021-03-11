const router = require('express').Router();

const userController = require('../controller/user.controller');
const { authMiddleware, fileMiddlewares, userMiddlewares } = require('../middleware');

router.get('/', userController.getAllUsers);

router.post(
    '/',
    fileMiddlewares.checkFile,
    fileMiddlewares.checkAvatar,
    userMiddlewares.isUserValid,
    userController.createUser
);

router.use('/:userId', userMiddlewares.checkIsIdValid); // для маршруту '/:userId' використовувати мідлвару, в інших роутах не дублювати

router.get('/:userId', userController.getSingleUser);

router.delete('/:userId', authMiddleware.checkAccessTokenMiddleware, userController.deleteUser);

// інший спосіб
// router.route('/:userId') // на шлях
//     .all(userMiddlewares.checkIsIdValid) // для всіх
//     .delete(authMiddleware.checkAccessTokenMiddleware, userController.deleteUser)
//     .get(userController.getSingleUser);

module.exports = router;
