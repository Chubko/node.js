const { statusCodes } = require('../constant');
const ErrorHandler = require('../error/error.handler');
const { errorMessages } = require('../error');
const { userService: { findUserById, findUserByEmail } } = require('../service');
const { userValidator } = require('../validator');

module.exports = {
    isIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await findUserById(userId);

            if (userId.length !== 24) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.ID_NOT_VALID.customCode,
                    errorMessages.ID_NOT_VALID.message
                );
            }

            if (!user) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.NOT_EXISTING_ID.customCode,
                    errorMessages.NOT_EXISTING_ID.message
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValid: async (req, res, next) => {
        try {
            const { email } = req.body;

            const { error } = userValidator.createUserValidator.validate(req.body);

            const isUser = await findUserByEmail(email);

            if (isUser.email) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.WRONG_EMAIL_OF_PASSWORD.customCode,
                    errorMessages.WRONG_EMAIL_OF_PASSWORD.message
                );
            }

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
    }
};
