const { databaseTables: { USERS } } = require('../../constant');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(USERS,
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                age: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                },
                gender: {
                    type: Sequelize.DataTypes.STRING,
                },
                email: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                avatar: {
                    type: Sequelize.DataTypes.STRING
                }
            });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(USERS);
    }
};
