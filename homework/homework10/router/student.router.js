const router = require('express').Router();

const { studentController } = require('../controller');
const { studentMiddleware } = require('../middleware');

router.get('/', studentController.getAllStudents);

router.post('/', studentMiddleware.isStudentValid, studentController.createStudent);

router.get('/:studentId', studentController.findStudentById);

router.put('/:studentId', studentMiddleware.isStudentValid, studentController.updateStudentById);

router.delete('/:studentId', studentController.deleteStudentById);

module.exports = router;
