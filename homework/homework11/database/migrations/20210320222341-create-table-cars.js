const { databaseTables: { CARS, USERS } } = require('../../constant');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(CARS,
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true
                },
                producer: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                price: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                },
                year: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                },
                photos: {
                    type: Sequelize.DataTypes.STRING,
                },
                docs: {
                    type: Sequelize.DataTypes.STRING,
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
                },
            });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(CARS);
    }
};
