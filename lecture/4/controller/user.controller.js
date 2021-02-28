const userService = require('../service/user.service');

module.exports = {
    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);

            res.status(201).json('User is created!'); // статус 201 - створено
        } catch (e) {
            res.json(e.message);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findAllUsers();

            res.json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        const { userId } = req.params;
        const user = await userService.findUserById(userId);

        res.json(user);
    },

};
