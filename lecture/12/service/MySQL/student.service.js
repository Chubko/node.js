// const db = require('../../database/MySQL'); // import connection
//
// module.exports = {
//     findAll: async () => {
//         const [dbResponse] = await db.query('SELECT * FROM students') || [];
//
//         return dbResponse;
//     },
//
//     createStudent: (userObject) => {
//         const { name, age, gender } = userObject;
//
//         return db.query(`INSERT INTO students (name, age, gender) VALUE ('${name}', '${age}', '${gender}')`);
//     }
// };

// const {_id } =User.findOne() || {} //якщо юзер є, то вернене ід, якщо ні, то пустий масив
// return _id;
// інший варіант
// const user = User.findOne();
// return user && user._id;

// sequelize

const db = require('../../database/MySQL').getInstance();

module.exports = {
    findAll: () => {
        const Student = db.getModel('Student'); // отримуєм модель

        return Student.findAll();
    },

    createStudent: (userObject, transaction) => {
        const Student = db.getModel('Student');

        return Student.create(userObject, { transaction });
    },

    updateStudent: (id, userObject, transaction) => {
        const Student = db.getModel('Student');

        return Student.update(userObject, {
            where: { id },
            returning: true, // щоб повернувся оновлений обєкт
            transaction
        });
    },
};
