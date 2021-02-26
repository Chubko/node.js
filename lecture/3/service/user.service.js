const DB = require('../database/users');

module.exports = {
    findAllUsers: () => DB,

    /**
     *
     * @param userId - This is integer ID of user which should be returned
     * @returns {{name: string}} - user...
     */
    findUserById: (userId) => DB[userId],

    createUser: (userObject) => {
        DB.push(userObject);
    }
};
