const { statusCodes } = require('../constant');
const { carMessage } = require('../message');
const { carService } = require('../service');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            await carService.createCar(req.body);

            res.status(statusCodes.CREATED).json(carMessage.CREATED);
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.findAllCars();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const car = await carService.findCarById(carId);

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    updateCarById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.updateCarById(carId, req.body);

            res.json(carMessage.UPDATED);
        } catch (e) {
            next(e);
        }
    },

    deleteCarById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.deleteCarById(carId);

            res.json(carMessage.DELETED);
        } catch (e) {
            next(e);
        }
    }
};
