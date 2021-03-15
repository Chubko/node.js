const { User } = require('../database/model');
require('../database/model/Car');

module.exports = {
    createUser: (userObject) => User.create(userObject),

    findAllUsers: () => User.find(),

    findUserById: (userId) => User.findById(userId),

    updateUserById: (userId, userObject) => User.updateOne({ _id: userId }, { $set: userObject }, { upsert: true }),

    deleteUserById: (userId) => User.findByIdAndDelete(userId),

    findUserByEmail: (userEmail) => User.findOne({ email: userEmail })
};
