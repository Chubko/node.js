const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../configs/config');
const { constants, statusCodes } = require('../constant');
const { authMessage, userMessage } = require('../message');
const { authService } = require('../service');

module.exports = {
    isUserRegistered: async (req, res, next) => {
        try {
            const { email, prefLang = 'en' } = req.body;

            const user = await authService.findUserByEmail({ email });

            if (!user) {
                throw new Error(userMessage.WRONG_EMAIL_PASSWORD[prefLang]);
            }

            req.user = user;

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const { prefLang = 'en' } = req.body;

            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new Error(authMessage.REQUIRED_TOKEN[prefLang]);
            }

            jwt.verify(access_token, JWT_ACCESS_SECRET, err => {
                if (err) {
                    throw new Error(authMessage.NOT_VERIFIED_TOKEN[prefLang]);
                }
            });

            const tokens = await authService.findToken({ access_token });

            if (!tokens) {
                throw new Error(authMessage.NOT_VALID_TOKEN[prefLang]);
            }

            req.user = tokens._user_id;

            next();
        } catch (e) {
            res.status(statusCodes.UNAUTHORIZED).json(e.message);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const { userId, prefLang = 'en' } = req.body;

            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new Error(authMessage.ACCESS_FORBIDDEN[prefLang]);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, err => {
                if (err) {
                    throw new Error(authMessage.NOT_VERIFIED_TOKEN[prefLang]);
                }
            });

            const userToken = await authService.checkUserExists(userId);

            if (!userToken) {
                throw new Error(authMessage.ACCESS_FORBIDDEN[prefLang]);
            }

            if (userToken.refresh_token !== refresh_token) {
                throw new Error(authMessage.NOT_VALID_TOKEN[prefLang]);
            }

            req.userToken = userToken;

            next();
        } catch (e) {
            res.status(statusCodes.FORBIDDEN).send(e.message);
        }
    },
};
