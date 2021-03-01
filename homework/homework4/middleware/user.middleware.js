const message = require('../message/user.message');
const statusCode = require('../constant/status.codes.enum');
const { findUserById } = require('../service/user.service');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const { name, age, preferLang = 'en' } = req.body;

            if (!name) {
                throw Error(message.MISSED_REQUIRED_FIELD_NAME[preferLang]);
            }

            if (typeof name !== 'string') {
                throw Error(message.INCORRECT_NAME[preferLang]);
            }

            if (age < 0 || !Number.isInteger(age) || Number.isNaN(age)) {
                throw Error(message.INCORRECT_AGE[preferLang]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isIdValid: (req, res, next) => {
        try {
            const { userId, preferLang = 'en' } = req.params;

            if (userId.length !== 24) {
                throw Error(message.INVALID_ID[preferLang]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isIdExisting: async (req, res, next) => {
        try {
            const { userId, preferLang = 'en' } = req.params;

            const user = await findUserById(userId);

            if (!user) {
                throw Error(message.NOT_EXISTING_ID[preferLang]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
