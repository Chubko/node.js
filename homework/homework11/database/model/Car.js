const { DataTypes } = require('sequelize');

const { databaseModels: { CAR, USER }, databaseTables: { CARS } } = require('../../constant');

module.exports = (client) => {
    const Car = client.define(
        CAR,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            producer: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            photos: {
                type: DataTypes.STRING,
            },
            docs: {
                type: DataTypes.STRING,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
                // foreignKey: true
            }
            // user_id: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            //     references: {
            //         model: USER,
            //         key: 'id',
            //         foreignKey: true
            //     }
            // }
        },
        {
            tableName: CARS,
            timestamps: false
        }
    );

    Car.associate = () => {
        Car.belongsTo(USER, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });
    };

    return Car;
};
