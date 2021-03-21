const { databaseTables: { TOKENS, USERS } } = require('../../constant');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(TOKENS,
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true
                },
                access_token: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                refresh_token: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                user_id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    onDelete: 'CASCADE',
                    references: {
                        model: USERS,
                        key: 'id',
                        as: 'user_id'
                    },
                }
            });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(TOKENS);
    }
};
