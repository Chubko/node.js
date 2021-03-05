const { statusCodes } = require('../constant');
const { userMessage } = require('../message');
const { userService: { findUserById, findUserByEmail } } = require('../service');
const { userValidator } = require('../validator');

module.exports = {
    isUserValid: async (req, res, next) => {
        try {
            const { email, preferLang = 'en' } = req.body;

            const { error } = userValidator.createUserValidator.validate(req.body);

            const isUser = await findUserByEmail(email);

            if (isUser.email) {
                throw new Error(userMessage.EXISTING_EMAIL[preferLang]);
            }

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
            const { userId, preferLang = 'en' } = req.params;

            const user = await findUserById(userId);

            if (userId.length !== 24) {
                throw Error(userMessage.INVALID_ID[preferLang]);
            }

            if (!user) {
                throw Error(userMessage.NOT_EXISTING_ID[preferLang]);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    }
};
