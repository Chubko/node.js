const studentService = require('../service/MySQL/student.service');

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
        try {
            await studentService.createStudent(req.body);

            res.json('ok');
        } catch (e) {
            next(e);
        }
    }
};
