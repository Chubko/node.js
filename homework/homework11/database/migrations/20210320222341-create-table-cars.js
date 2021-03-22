const { databaseTables: { CARS, USERS } } = require('../../constant');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(CARS,
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                producer: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                price: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false
                },
                year: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false
                },
                photos: {
                    type: Sequelize.DataTypes.STRING
                },
                docs: {
                    type: Sequelize.DataTypes.STRING
                },
                user_id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                    references: {
                        model: USERS,
                        key: 'id',
                    },
                },
            });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(CARS);
    }
};
