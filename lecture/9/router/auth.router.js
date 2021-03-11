const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/', authController.authUser);

router.post('/refresh', authMiddleware.checkRefreshTokenMiddleware, authController.refreshToken);

module.exports = router;
