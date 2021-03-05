const { statusCodes } = require('../constant');
const { carMessage } = require('../message');
const { carService: { findCarById } } = require('../service');
const { carValidator } = require('../validator');

module.exports = {
    isCarValid: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    isIdValid: async (req, res, next) => {
        try {
            const { carId, preferLang = 'en' } = req.params;

            const car = await findCarById(carId);

            if (carId.length !== 24) {
                throw Error(carMessage.INVALID_ID[preferLang]);
            }

            if (!car) {
                throw Error(carMessage.NOT_EXISTING_ID[preferLang]);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    }
};
