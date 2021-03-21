const { MYSQL_DB_NAME } = require('../../configs/config');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createDatabase(MYSQL_DB_NAME);
    },

    down: async (queryInterface) => {
        await queryInterface.dropDatabase(MYSQL_DB_NAME);
    }
};
