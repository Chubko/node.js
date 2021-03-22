const { DataTypes } = require('sequelize');

const { databaseModels: { CAR, O_AUTH, USER }, databaseTables: { USERS } } = require('../../constant');

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

    User.associate = () => {
        User.hasMany(CAR, {
            foreignKey: 'user_id'
        });
    };

    User.associate = () => {
        User.hasMany(O_AUTH, {
            foreignKey: 'user_id'
        });
    };

    return User;
};
