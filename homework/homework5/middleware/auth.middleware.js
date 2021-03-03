const { statusCodes } = require('../constant');
const { User } = require('../database/model');
const { userMessage } = require('../message');

module.exports = {
    isUserRegistered: async (req, res, next) => {
        try {
            const { email, prefLang = 'en' } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                throw new Error(userMessage.WRONG_EMAIL_PASSWORD[prefLang]);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    }
};
