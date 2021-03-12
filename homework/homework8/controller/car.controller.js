const { statusCodes } = require('../constant');
const { attachmentDirBuilder } = require('../helper');
const { carMessage } = require('../message');
const { carService } = require('../service');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const { docs, photos } = req;
            const car = await carService.createCar(req.body);

            if (docs) {
                const promises = docs.map(doc => attachmentDirBuilder(doc, doc.name, 'docs', car._id));

                await Promise.allSettled(promises)
                    // eslint-disable-next-line no-return-await
                    .then((results) => results.forEach(async doc => await carService.updateCarById(car._id,
                        { $push: { docs: doc.value.uploadPath } })));
            }

            if (photos) {
                const promises = photos.map(photo => attachmentDirBuilder(photo, photo.name, 'photos', car._id));

                await Promise.allSettled(promises)
                    // eslint-disable-next-line no-return-await
                    .then((results) => results.forEach(async photo => await carService.updateCarById(car._id,
                        { $push: { photos: photo.value.uploadPath } })));
            }

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
