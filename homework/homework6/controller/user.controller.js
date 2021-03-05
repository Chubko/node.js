const { statusCodes } = require('../constant');
const { passwordHasher } = require('../helper');
const { userMessage } = require('../message');
const { userService } = require('../service');

module.exports = {
    createUser: async (req, res) => {
        try {
            const { password, prefLang = 'en' } = req.body;

            const hashPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            res.status(statusCodes.CREATED).json(userMessage.CREATED[prefLang]);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findAllUsers();

            res.json(users);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    findUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    updateUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            await userService.updateUserById(userId, req.body);

            res.json(userMessage.UPDATED);
        } catch (e) {
            res.status(statusCodes.NOT_FOUND).json(e.message);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            await userService.deleteUserById(userId);

            res.status(statusCodes.DELETED).json(userMessage.DELETED);
        } catch (e) {
            res.status(statusCodes.NOT_FOUND).json(e.message);
        }
    }
};
