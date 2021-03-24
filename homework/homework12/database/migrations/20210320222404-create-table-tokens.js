const { databaseTables: { TOKENS, USERS } } = require('../../constant');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(TOKENS,
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
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
                    foreignKey: true,
                    onUpdate: 'CASCADE',
                    references: {
                        model: USERS,
                        key: 'id',
                    },
                },
                createdAt: Sequelize.DataTypes.DATE
            });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(TOKENS);
    }
};
