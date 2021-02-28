const router = require('express').Router();

const carController = require('../controller/car.controller');
const carMiddleware = require('../middleware/car.middleware');

router.get('/', carController.findAllCars);
router.post('/', carMiddleware.isCarValid, carController.createCar);
router.get('/:carId', carMiddleware.isIdValid, carController.findCarById);
router.put('/:carId', carMiddleware.isIdValid, carController.updateCarById);
router.delete('/:carId', carMiddleware.isIdValid, carController.deleteCarById);

module.exports = router;
