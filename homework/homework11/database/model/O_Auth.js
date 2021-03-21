const { DataTypes } = require('sequelize');

const { databaseModels: { O_AUTH, USER }, databaseTables: { TOKENS } } = require('../../constant');

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
            tableName: TOKENS,
            timestamps: false
        }
    );

    O_Auth.associate = () => {
        O_Auth.belongsTo(USER, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });
    };

    return O_Auth;
};
