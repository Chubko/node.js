const userService = require('../service/user.service');
const statusCode = require('../constant/statusCodes.enum');
const message = require('../message/success.message');

module.exports = {
    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);

            res.status(statusCode.CREATED).json(message.CREATED);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            if (req.query) {
                next();
            }

            const users = await userService.findAllUsers();
            
            res.json(users);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    getUserByName: async (req, res) => {
        try {
            if (!req.query) {
                return;
            }

            const user = await userService.findUserByNameOrEmail(req.query);

            res.json(user);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            await userService.deleteUser(req.query);

            res.status(statusCode.CREATED).json(message.DELETED);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
}
