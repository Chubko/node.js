const { statusCodes } = require('../constant');
const { studentMessage } = require('../message');
const { studentService } = require('../service');

module.exports = {
    getAllStudents: async (req, res, next) => {
        try {
            const students = await studentService.findAllStudents(req.query);

            res.json(students);
        } catch (e) {
            next(e);
        }
    },

    createStudent: async (req, res, next) => {
        try {
            const student = await studentService.createStudent(req.body);

            res.status(statusCodes.CREATED).json(student);
        } catch (e) {
            next(e);
        }
    },

    findStudentById: async (req, res, next) => {
        try {
            const { studentId } = req.params;

            const student = await studentService.findStudentById(studentId);

            res.json(student);
        } catch (e) {
            next(e);
        }
    },

    updateStudentById: async (req, res, next) => {
        try {
            const { body, params: { studentId } } = req;

            await studentService.updateUserById(body, studentId);

            res.json(studentMessage.UPDATED);
        } catch (e) {
            next(e);
        }
    },

    deleteStudentById: async (req, res, next) => {
        try {
            const { studentId } = req.params;

            await studentService.deleteUserById(studentId);

            res.status(statusCodes.DELETED).json(studentMessage.DELETED);
        } catch (e) {
            next(e);
        }
    },
};
