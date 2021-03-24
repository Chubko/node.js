const jwt = require('jsonwebtoken');

// const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../configs/config');
const { constants, statusCodes } = require('../constant');
const ErrorHandler = require('../error/error.handler');
const { errorMessages } = require('../error');
const { authService, userService } = require('../service');

const { secretWords } = require('../constant');

module.exports = {
    isUserRegistered: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await userService.findOneUser({ email });

            if (!user) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.WRONG_EMAIL_OF_PASSWORD.customCode,
                    errorMessages.WRONG_EMAIL_OF_PASSWORD.message
                );
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.NO_TOKEN.customCode,
                    errorMessages.NO_TOKEN.message
                );
            }
            const tokens = await authService.findToken(access_token);

            const { role } = await userService.findUserById(tokens.user_id);

            const { JWT_ACCESS_SECRET } = secretWords[role];

            jwt.verify(access_token, JWT_ACCESS_SECRET, err => {
                if (err) {
                    throw new ErrorHandler(
                        statusCodes.UNAUTHORIZED,
                        errorMessages.NOT_VERIFIED_TOKEN.customCode,
                        errorMessages.NOT_VERIFIED_TOKEN.message
                    );
                }
            });

            if (!tokens) {
                throw new ErrorHandler(
                    statusCodes.NOT_FOUND,
                    errorMessages.RECORD_NOT_FOUND.customCode,
                    errorMessages.RECORD_NOT_FOUND.message
                );
            }

            req.userId = tokens.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const { email } = req.body;

            const refresh_token = req.get(constants.AUTHORIZATION);

            const user = await userService.findOneUser({ email });

            const { role } = user;

            const { JWT_REFRESH_SECRET } = secretWords[role];

            if (!refresh_token) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.NO_TOKEN.customCode,
                    errorMessages.NO_TOKEN.message
                );
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, err => {
                if (err) {
                    throw new ErrorHandler(
                        statusCodes.UNAUTHORIZED,
                        errorMessages.NOT_VERIFIED_TOKEN.customCode,
                        errorMessages.NOT_VERIFIED_TOKEN.message
                    );
                }
            });

            const userToken = await authService.checkUserExists(user.id);

            if (!userToken) {
                throw new ErrorHandler(
                    statusCodes.NOT_FOUND,
                    errorMessages.RECORD_NOT_FOUND.customCode,
                    errorMessages.RECORD_NOT_FOUND.message
                );
            }

            if (userToken.refresh_token !== refresh_token) {
                throw new ErrorHandler(
                    statusCodes.UNAUTHORIZED,
                    errorMessages.NOT_VALID_TOKEN.customCode,
                    errorMessages.NOT_VALID_TOKEN.message
                );
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (usersWithAccess = []) => async (req, res, next) => {
        try {
            const { userId } = req;

            const { role } = await userService.findUserById(userId);

            if (!usersWithAccess.length) {
                next();
            }

            if (!usersWithAccess.includes(role)) {
                throw new ErrorHandler(
                    statusCodes.FORBIDDEN,
                    errorMessages.ACCESS_FORBIDDEN.customCode,
                    errorMessages.ACCESS_FORBIDDEN.message
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
