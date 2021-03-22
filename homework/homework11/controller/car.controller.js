const { dirNames: { CAR, DOCS, PHOTOS }, statusCodes } = require('../constant');
const { transactionInstance } = require('../database').getInstance();
const { attachmentDirBuilder } = require('../helper');
const { carMessage } = require('../message');
const { carService, fileService } = require('../service');

module.exports = {
    createCar: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { body, docs, photos } = req;

            const car = await carService.createCar(body, transaction);

            if (docs) {
                const promises = docs.map(doc => attachmentDirBuilder(doc, DOCS, car.id, CAR));

                await Promise.allSettled(promises)
                    .then((results) => results.map(doc => doc.value.uploadPath))
                    .then(results => results.toString())
                    .then(results => carService.updateCarById(car.id, { docs: results }, transaction));
            }

            if (photos) {
                const promises = photos.map(photo => attachmentDirBuilder(photo, PHOTOS, car.id, CAR));

                await Promise.allSettled(promises)
                    .then((results) => results.map(photo => photo.value.uploadPath))
                    .then(results => results.toString())
                    .then(results => carService.updateCarById(car.id, { photos: results }, transaction));
            }

            await transaction.commit();

            res.status(statusCodes.CREATED).json(car);
        } catch (e) {
            await transaction.rollback();

            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.findAllCars(req.query);

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: (req, res, next) => {
        try {
            const { car } = req;

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    updateCarById: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                body, docs, params: { carId }, photos
            } = req;

            if (docs) {
                const promises = docs.map(doc => attachmentDirBuilder(doc, DOCS, carId, CAR));

                await Promise.allSettled(promises)
                    .then((results) => results.map(doc => doc.value.uploadPath))
                    .then(results => results.toString())
                    .then(results => carService.updateCarById(carId, { docs: results }, transaction));
            }

            if (photos) {
                const promises = photos.map(photo => attachmentDirBuilder(photo, PHOTOS, carId, CAR));

                await Promise.allSettled(promises)
                    .then((results) => results.map(photo => photo.value.uploadPath))
                    .then(results => results.toString())
                    .then(results => carService.updateCarById(carId, { photos: results }, transaction));
            }

            if (body) {
                await carService.updateCarById(carId, body, transaction);
            }

            await transaction.commit();

            res.json(carMessage.UPDATED);
        } catch (e) {
            await transaction.rollback();

            next(e);
        }
    },

    deleteCarById: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { carId } = req.params;

            await carService.deleteCarById(carId, transaction);

            await fileService.deleteFile(CAR, carId);

            await transaction.commit();

            res.json(carMessage.DELETED);
        } catch (e) {
            await transaction.rollback();

            next(e);
        }
    }
};
