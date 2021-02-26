const userService = require('../service/user.service');

const errorCode = require('../constant/errorCodes.enum');

module.exports = {
    createUser: (req, res) => {
        userService.createUser(req.body);
        res.status(201).json('User is created!'); //статус 201 - створено
    },

    getAllUsers: (req, res) => {
        try{
        const users = userService.findAllUsers();

        res.json(users);
    } catch (e){
            res.status(400).json(e.message);
        }

    },

    getSingleUser: (req, res) => {
        const {userId} = req.params;
        const user = userService.findUserById(userId);

        res.json(user);
    },


}
