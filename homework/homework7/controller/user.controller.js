const { statusCodes } = require('../constant');
const { passwordHasher } = require('../helper');
const { userMessage } = require('../message');
const { userService } = require('../service');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password, prefLang = 'en' } = req.body;

            const hashPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            res.status(statusCodes.CREATED).json(userMessage.CREATED[prefLang]);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    findUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await userService.updateUserById(userId, req.body);

            res.json(userMessage.UPDATED);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await userService.deleteUserById(userId);

            res.status(statusCodes.DELETED).json(userMessage.DELETED);
        } catch (e) {
            next(e);
        }
    }
};
