const userService = require('../service/user.service');
const statusCode = require('../constant/status.codes.enum');
const message = require('../message/user.message');

module.exports = {
    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);

            res.status(statusCode.CREATED).json(message.CREATED);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    findAllUsers: async (req, res) => {
        try {
            const users = await userService.findAllUsers();

            res.json(users);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    findUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    updateUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            await userService.updateUserById(userId, req.body);

            res.json(message.UPDATED);
        } catch (e) {
            res.status(statusCode.NOT_FOUND).json(e.message);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            await userService.deleteUserById(userId);

            res.status(statusCode.DELETED).json(message.DELETED);
        } catch (e) {
            res.status(statusCode.NOT_FOUND).json(e.message);
        }
    }
};
