const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);

router.post('/', carMiddleware.isCarValid, carController.createCar);

router.use('/:carId', carMiddleware.isIdValid);

router.get('/:carId', carController.getCarById);

router.put('/:carId', carController.updateCarById);

router.delete('/:carId', carController.deleteCarById);

module.exports = router;
