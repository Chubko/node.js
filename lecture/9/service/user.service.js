const User = require('../database/models/user');
require('../database/models/car');

module.exports = {
    findAllUsers: () => User.find(),

    /**
     * findUserById
     * @param userId - This is integer ID of user which should be returned
     * @returns {Query<Document | null, Document>} - user...
     */
    findUserById: (userId) => User.findById(userId),

    createUser: (userObject) => User.create(userObject),

    updateUserById: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject })

};
