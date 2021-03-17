const { statusCodes } = require('../constant');
const ErrorHandler = require('../error/error.handler');
const { errorMessages } = require('../error');
const { studentValidator } = require('../validator');

module.exports = {
    isStudentValid: (req, res, next) => {
        try {
            const { error } = studentValidator.createStudentValidator.validate(req.body);

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
