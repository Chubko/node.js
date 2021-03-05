const { User } = require('../database/model');
require('../database/model/Car');

module.exports = {
    createUser: (userObject) => User.create(userObject),

    findAllUsers: () => User.find(),

    findUserById: (userId) => User.findById(userId),

    updateUserById: (userId, userObject) => User.findByIdAndUpdate(userId, userObject, { useFindAndModify: false }),

    deleteUserById: (userId) => User.findByIdAndDelete(userId),

    findUserByEmail: (userEmail) => User.find({ email: userEmail })
};
