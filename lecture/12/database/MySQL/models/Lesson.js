const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const Lesson = client.define(
        'Lesson', // назва моделі
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            date: {
                type: DataTypes.STRING
            },
            label: {
                type: DataTypes.STRING
            },
            student_count: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'lesson2', // назва таблиці
            timestamps: false // щоб не падала помилка якщо немає полів з датою створення і оновлення
        }
    );

    return Lesson;
};
