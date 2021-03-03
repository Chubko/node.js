const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/', authMiddleware.isUserRegistered, authController.authController);

module.exports = router;
