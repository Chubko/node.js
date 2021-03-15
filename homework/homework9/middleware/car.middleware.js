const { statusCodes } = require('../constant');
const ErrorHandler = require('../error/error.handler');
const { errorMessages } = require('../error');
const { carService: { findCarById } } = require('../service');
const { carValidator } = require('../validator');

module.exports = {
    isCarValid: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.BAD_REQUEST.customCode,
                    error.details[0].message
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isIdValid: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const car = await findCarById(carId);

            if (carId.length !== 24) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.ID_NOT_VALID.customCode,
                    errorMessages.ID_NOT_VALID.message
                );
            }

            if (!car) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.NOT_EXISTING_ID.customCode,
                    errorMessages.NOT_EXISTING_ID.message
                );
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    }
};
