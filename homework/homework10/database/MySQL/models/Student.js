const { DataTypes } = require('sequelize');

const { databaseTables: { STUDENT }, mySQLTables: { STUDENTS } } = require('../../../constant');

module.exports = (client) => client.define(
    STUDENT,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: STUDENTS,
        timestamps: false
    }
);
