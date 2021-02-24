const userService = require('../service/user.service');
const statusCode = require('../constant/statusCodes.enum');
const message = require('../message/success.message');

module.exports = {
    createUser: async (req, res) => {
        try{
            await userService.createUser(req.body);

            res.status(statusCode.CREATED).json(message.CREATED);
        }catch (e){
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    getAllUsers: async (req, res) => {
        try{
            const users = await userService.findAllUsers();

            res.json(users);
        } catch (e){
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    getUserByName: async (req, res) => {
        try{
            const {userName} = req.params;
            const user = await userService.findUserByName(userName);

            res.json(user);
        }catch (e){
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try{
            const {userName} = req.params;

            await userService.deleteUser(userName);

            res.status(statusCode.CREATED).json(message.DELETED);
        } catch (e){
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
}
