const { statusCodes } = require('../constant');
const { User } = require('../database/model');
const { passwordHasher } = require('../helper');
const { userMessage } = require('../message');

module.exports = {
    authController: async (req, res) => {
        try {
            const { email, password, prefLang = 'en' } = req.body;

            const user = await User.findOne({ email });

            await passwordHasher.compare(password, user.password);

            res.json(userMessage.AUTH_SUCCESSFUL[prefLang]);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    }
};
