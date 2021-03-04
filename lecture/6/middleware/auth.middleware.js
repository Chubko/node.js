const jwt = require('jsonwebtoken');

const O_Auth = require('../database/models/O_Auth');
const { JWT_SECRET } = require('../config/config');
const { constants } = require('../constant');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION); // отримуєм access_token від fronta, в header має бути вказано Authorization

            if (!access_token) {
                throw new Error('Token is required');
            }

            jwt.verify(access_token, JWT_SECRET, err => { // перевірка токена на валідність
                if (err) {
                    throw new Error('Not valid token VERIFY');
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('user'); // пошук токена в БД, привязка до юзера по ід

            console.log('tokens', tokens);

            if (!tokens) {
                throw new Error('Not valid token');
            }

            console.log(access_token);

            req.user = tokens._user_id; // передача в контролер

            next();
        } catch (e) {
            next(e);
        }
    }
};
