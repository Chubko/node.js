const router = require('express').Router();

const carController = require('../controller/car.controller');
const carMiddleware = require('../middleware/car.middleware');

router.get('/', carController.findAllCars);
router.post('/', carMiddleware.isCarValid, carController.createCar);
router.get('/:carId', carMiddleware.isIdExisting, carMiddleware.isIdValid, carController.findCarById);
router.put('/:carId', carMiddleware.isIdExisting, carMiddleware.isIdValid, carController.updateCarById);
router.delete('/:carId', carMiddleware.isIdExisting, carMiddleware.isIdValid, carController.deleteCarById);

module.exports = router;
