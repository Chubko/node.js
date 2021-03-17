const { Op } = require('sequelize');

const db = require('../../database/MySQL').getInstance();

const { STUDENT } = require('../../constant/database.Tables.enum');
const { queryBuilder } = require('../../helper');

module.exports = {
    findAllStudents: async (query) => {
        const Student = db.getModel(STUDENT);

        const { filters, keys } = queryBuilder(query);
        const { ageGte, ageLte } = filters;

        const filterObject = {};

        keys.forEach(key => {
            switch (key) {
                case 'ageGte':
                    if (ageLte) {
                        filterObject.age = {
                            [Op.and]: {
                                [Op.gte]: ageGte,
                                [Op.lte]: ageLte
                            },
                        };
                        return;
                    }

                    filterObject.age = { [Op.gte]: ageGte };

                    // інший спосіб
                    // ageLte && (filterObject.age = {
                    //     [Op.and]: {
                    //         [Op.gte]: ageGte,
                    //         [Op.lte]: ageLte
                    //     },
                    // });

                    break;
                case 'ageLte':
                    if (ageGte) {
                        filterObject.age = {
                            [Op.and]: {
                                [Op.gte]: ageGte,
                                [Op.lte]: ageLte
                            },
                        };
                        return;
                    }

                    filterObject.age = { [Op.lte]: ageLte };

                    // інший спосіб
                    // (ageGte) && (filterObject.age = {
                    //     [Op.and]: {
                    //         [Op.gte]: ageGte,
                    //         [Op.lte]: ageLte
                    //     },
                    // });

                    break;
                case 'name':
                    filterObject.name = { [Op.like]: `%${filters.name}%` };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const students = await Student.findAll({ where: filterObject });

        return {
            data: students,
        };
    },

    createStudent: (userObject) => {
        const Student = db.getModel(STUDENT);

        return Student.create(userObject);
    },

    findStudentById: (studentId) => {
        const Student = db.getModel(STUDENT);

        return Student.findOne({ where: { id: studentId } });
    },

    updateUserById: (studentObject, studentId) => {
        const Student = db.getModel(STUDENT);

        return Student.update(studentObject, {
            where: { id: studentId }
        });
    },

    deleteUserById: (studentId) => {
        const Student = db.getModel(STUDENT);

        return Student.destroy({ where: { id: studentId } });
    }
};
