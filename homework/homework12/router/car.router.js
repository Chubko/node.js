const router = require('express').Router();

const { ADMIN } = require('../constant/roles.enum');
const { carController } = require('../controller');
const { authMiddleware, carMiddleware, fileMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);

router.post(
    '/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkUserRole([ADMIN]),
    fileMiddleware.checkFile,
    carMiddleware.isCarValid,
    carController.createCar
);

router.use('/:carId', carMiddleware.isIdValid);

router.get('/:carId', carController.getCarById);

router.put(
    '/:carId',
    authMiddleware.checkAccessToken,
    authMiddleware.checkUserRole([ADMIN]),
    carMiddleware.isCarValid,
    fileMiddleware.checkFile,
    carController.updateCarById
);

router.delete(
    '/:carId',
    authMiddleware.checkAccessToken,
    authMiddleware.checkUserRole([ADMIN]),
    carController.deleteCarById
);

module.exports = router;
