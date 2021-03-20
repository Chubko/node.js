const studentService = require('../service/MySQL/student.service');
const { transactionInstance } = require('../database/MySQL').getInstance();

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const students = await studentService.findAll();

            res.json(students);
        } catch (e) {
            next(e);
        }
    },

    createStudent: async (req, res, next) => {
        const transaction = await transactionInstance(); // створення транзакції
        try {
            await studentService.createStudent(req.body, transaction);

            // throw new Error('errr');

            await studentService.updateStudent(15, { name: 'Ira' }, transaction);

            await transaction.commit(); // підтвердження транзакції

            res.json('ok');
        } catch (e) {
            await transaction.rollback(); // відміна транзакції
            next(e);
        }
    }
};
