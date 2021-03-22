const { DataTypes } = require('sequelize');

const { databaseModels: { USER }, databaseTables: { USERS } } = require('../../constant');

module.exports = (client) => {
    const User = client.define(
        USER,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: DataTypes.STRING
            },
            car_id: {
                type: DataTypes.INTEGER
            },
            o_Auth_id: {
                type: DataTypes.INTEGER
            },
        },
        {
            tableName: USERS,
            timestamps: false
        }
    );

    const Car = require('./Car')(client);
    const O_Auth = require('./O_Auth')(client);

    User.hasMany(Car, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    User.hasMany(O_Auth, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    return User;
};
