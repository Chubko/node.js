const jwt = require('jsonwebtoken');

const O_Auth = require('../database/models/O_Auth');
const { JWT_SECRET } = require('../config/config');
const { constants, errorCodesEnum } = require('../constant');
const ErrorHandler = require('../error/ErrorHandler');
const { NO_TOKEN, RECORD_NOT_FOUND, WRONG_TOKEN } = require('../error/error.message');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION); // отримуєм access_token від fronta, в header має бути вказано Authorization

            if (!access_token) {
                throw new Error('Token is required');
            }

            jwt.verify(access_token, JWT_SECRET, err => { // перевірка токена на валідність
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.UNAUTHORIZED, WRONG_TOKEN.customCode);
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('user'); // пошук токена в БД, привязка до юзера по ід

            console.log('tokens', tokens);

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, RECORD_NOT_FOUND.customCode);
            }

            console.log(access_token);

            req.user = tokens._user_id; // передача в контролер

            next();
        } catch (e) {
            next(e); // передає далі помилку
        }
    },

    checkRefreshTokenMiddleware: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION); // отримуєм access_token від fronta, в header має бути вказано Authorization

            if (!refresh_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NO_TOKEN.customCode);
            }

            jwt.verify(refresh_token, JWT_SECRET, err => { // перевірка токена на валідність
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.UNAUTHORIZED, WRONG_TOKEN.customCode);
                }
            });

            const tokens = await O_Auth.findOne({ refresh_token });

            console.log('tokens', tokens);

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, RECORD_NOT_FOUND.customCode);
            }

            console.log(refresh_token);

            req.tokenInfo = tokens; // передача в контролер

            next();
        } catch (e) {
            next(e); // передає далі помилку
        }
    }
};
