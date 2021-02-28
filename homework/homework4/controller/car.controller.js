const carService = require('../service/car.service');
const statusCode = require('../constant/status.codes.enum');
const message = require('../message/car.message');

module.exports = {
    createCar: async (req, res) => {
        try {
            await carService.createCar(req.body);

            res.status(statusCode.CREATED).json(message.CREATED);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    findAllCars: async (req, res) => {
        try {
            const cars = await carService.findAllCars();

            res.json(cars);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).join(e.message);
        }
    },

    findCarById: async (req, res) => {
        try {
            const { carId } = req.params;

            const car = await carService.findCarById(carId);

            res.join(car);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    updateCarById: async (req, res) => {
        try {
            const { carId } = req.params;

            await carService.updateCarById(carId, req.body);

            res.json(message.UPDATED);
        } catch (e) {
            res.status(statusCode.NOT_FOUND).json(e.message);
        }
    },

    deleteCarById: async (req, res) => {
        try {
            const { carId } = req.params;

            await carService.deleteCarById(carId);

            res.status(statusCode.DELETED).json(message.DELETED);
        } catch (e) {
            res.status(statusCode.NOT_FOUND).json(e.message);
        }
    }
};
