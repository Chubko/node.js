const statusCode = require('../constant/statusCodes.enum');
const errorMessage = require('../message/error.message');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const {name, email, password, preferLang = 'en'} = req.body;

            if (!name) {
                throw Error(errorMessage.MISSED_REQUIRED_FIELD_NAME[preferLang]);
            }

            if (!email) {
                throw Error(errorMessage.MISSED_REQUIRED_FIELD_EMAIL[preferLang]);
            }

            if (!password) {
                throw Error(errorMessage.MISSED_REQUIRED_FIELD_PASSWORD[preferLang]);
            }

            if (!email.includes('@')) {
                throw Error(errorMessage.INCORRECT_EMAIL[preferLang]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
}
