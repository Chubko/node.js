const { Op } = require('sequelize');

const { CAR } = require('../constant/database.Models.enum');
const db = require('../database').getInstance();
const { queryBuilder } = require('../helper');

module.exports = {
    createCar: (carObject, transaction) => {
        const Car = db.getModel(CAR);

        Car.create(carObject, { transaction });
    },

    findAllCars: async (query) => {
        const Car = db.getModel(CAR);

        const { filters, keys } = queryBuilder(query);
        const { priceGte, priceLte } = filters;

        const filterObject = {};

        keys.forEach(key => {
            switch (key) {
                case 'priceGte':
                    if (priceLte) {
                        filterObject.price = {
                            [Op.and]: {
                                [Op.gte]: priceGte,
                                [Op.lte]: priceLte
                            },
                        };
                        return;
                    }

                    filterObject.age = { [Op.gte]: priceGte };
                    break;
                case 'priceLte':
                    if (priceGte) {
                        filterObject.price = {
                            [Op.and]: {
                                [Op.gte]: priceGte,
                                [Op.lte]: priceLte
                            },
                        };
                        return;
                    }

                    filterObject.age = { [Op.gte]: priceLte };
                    break;
                case 'producer':
                    filterObject.producer = { [Op.like]: `%${filters.producer}%` };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const cars = await Car.findAll({ where: filterObject });

        return {
            data: cars
        };
    },

    findCarById: (carId) => {
        const Car = db.getModel(CAR);

        return Car.findOne({ where: { id: carId } });
    },

    updateCarById: (carId, carObject, transaction) => {
        const Car = db.getModel(CAR);

        return Car.update(carObject, { where: { id: carId }, transaction });
    },

    deleteCarById: (carId, transaction) => {
        const Car = db.getModel(CAR);

        return Car.destroy({ where: { id: carId }, transaction });
    }
};
