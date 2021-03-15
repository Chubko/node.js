const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddleware, fileMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);

router.post(
    '/',
    fileMiddleware.checkFile,
    carMiddleware.isCarValid,
    carController.createCar
);

router.use('/:carId', carMiddleware.isIdValid);

router.get('/:carId', carController.getCarById);

router.put('/:carId', fileMiddleware.checkFile, carController.updateCarById);

router.delete('/:carId', carController.deleteCarById);

module.exports = router;
