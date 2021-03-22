const { Op } = require('sequelize');

const { CAR, USER } = require('../constant/database.Models.enum');
const db = require('../database').getInstance();
const { queryBuilder } = require('../helper');

module.exports = {
    createUser: (userObject, transaction) => {
        const User = db.getModel(USER);

        return User.create(userObject, { transaction });
    },

    findAllUsers: async (query) => {
        const Car = db.getModel(CAR);
        const User = db.getModel(USER);

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
                case 'email':
                    filterObject.email = { [Op.like]: `%${filters.email}%` };
                    break;
                case 'name':
                    filterObject.name = { [Op.like]: `%${filters.name}%` };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const users = await User.findAll({
            where: filterObject,
            attributes: { exclude: 'password' },
            include: Car
        });

        return {
            data: users
        };
    },

    findOneUser: (userObject) => {
        const User = db.getModel(USER);

        return User.findOne({
            where: userObject
        });
    },

    findUserById: (userId) => {
        const Car = db.getModel(CAR);
        const User = db.getModel(USER);

        return User.findOne({
            where: { id: userId },
            attributes: { exclude: 'password' },
            include: Car
        });
    },

    updateUserById: (userId, userObject, transaction) => {
        const Car = db.getModel(CAR);
        const User = db.getModel(USER);

        return User.update(userObject, {
            where: { id: userId },
            attributes: { exclude: 'password' },
            include: Car,
            returning: true,
            transaction
        });
    },

    deleteUserById: (userId, transaction) => {
        const User = db.getModel(USER);

        return User.destroy({ where: { id: userId }, transaction });
    }
};
