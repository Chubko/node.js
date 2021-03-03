const { statusCodes } = require('../constant');
const { carMessage } = require('../message');
const { carService } = require('../service');

module.exports = {
    createCar: async (req, res) => {
        try {
            await carService.createCar(req.body);

            res.status(statusCodes.CREATED).json(carMessage.CREATED);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    getAllCars: async (req, res) => {
        try {
            const cars = await carService.findAllCars();

            res.json(cars);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    getCarById: async (req, res) => {
        try {
            const { carId } = req.params;

            const car = await carService.findCarById(carId);

            res.json(car);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    updateCarById: async (req, res) => {
        try {
            const { carId } = req.params;

            await carService.updateCarById(carId, req.body);

            res.json(carMessage.UPDATED);
        } catch (e) {
            res.status(statusCodes.NOT_FOUND).json(e.message);
        }
    },

    deleteCarById: async (req, res) => {
        try {
            const { carId } = req.params;

            await carService.deleteCarById(carId);

            res.json(carMessage.DELETED);
        } catch (e) {
            res.status(statusCodes.NOT_FOUND).json(e.message);
        }
    }
};
