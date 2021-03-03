const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);

router.post('/', carMiddleware.isCarValid, carController.createCar);

router.get('/:carId', carMiddleware.isIdValid, carController.getCarById);

router.put('/:carId', carMiddleware.isIdValid, carController.updateCarById);

router.delete('/:carId', carMiddleware.isIdValid, carController.deleteCarById);

module.exports = router;
