const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.findAllUsers);
router.post('/', userMiddleware.isUserValid, userController.createUser);
router.get('/:userId', userMiddleware.isIdExisting, userMiddleware.isIdValid, userController.findUserById);
router.put('/:userId', userMiddleware.isIdExisting, userMiddleware.isIdValid, userController.updateUserById);
router.delete('/:userId', userMiddleware.isIdExisting, userMiddleware.isIdValid, userController.deleteUserById);

module.exports = router;
