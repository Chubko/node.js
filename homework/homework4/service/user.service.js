const User = require('../database/model/user.model');
require('../database/model/car.model');

module.exports = {
    createUser: (userObject) => User.create(userObject),

    findAllUsers: () => User.find(),

    findUserById: (userId) => User.findById(userId),

    updateUserById: (userId, userObject) => User.findByIdAndUpdate(userId, userObject, { upsert: true }),

    deleteUserById: (userId) => User.findByIdAndDelete(userId)
};
