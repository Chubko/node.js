const message = require('../message/car.message');
const statusCode = require('../constant/status.codes.enum');
const { findCarById } = require('../service/car.service');

module.exports = {
    isCarValid: (req, res, next) => {
        try {
            const { producer, price, preferLang = 'en' } = req.body;

            if (!producer) {
                throw Error(message.MISSED_REQUIRED_FIELD_PRODUCER[preferLang]);
            }

            if (!price) {
                throw Error(message.MISSED_REQUIRED_FIELD_PRICE[preferLang]);
            }

            if (typeof price !== 'number') {
                throw Error(message.INCORRECT_PRICE[preferLang]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isIdValid: (req, res, next) => {
        try {
            const { carId, preferLang = 'en' } = req.params;

            if (carId.length !== 24) {
                throw Error(message.INVALID_ID[preferLang]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isIdExisting: async (req, res, next) => {
        try {
            const { carId, preferLang = 'en' } = req.params;

            const car = await findCarById(carId);

            if (!car) {
                throw Error(message.NOT_EXISTING_ID[preferLang]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
