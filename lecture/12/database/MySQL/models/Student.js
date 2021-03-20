const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const Student = client.define(
        'Student', // назва моделі
        { // опис моделі
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            age: {
                type: DataTypes.INTEGER
            },
            gender: {
                type: DataTypes.STRING
            },
            name: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'students', // назва таблиці
            timestamps: false // щоб не падала помилка якщо немає полів з датою створення і оновлення
        }
    );

    return Student;
};
