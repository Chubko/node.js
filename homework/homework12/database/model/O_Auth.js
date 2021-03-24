const { DataTypes } = require('sequelize');

const { databaseModels: { O_AUTH }, databaseTables: { TOKENS } } = require('../../constant');

module.exports = (client) => {
    const O_Auth = client.define(
        O_AUTH,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            access_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                onUpdate: 'CASCADE'
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            tableName: TOKENS,
            timestamps: true
        }
    );

    return O_Auth;
};
