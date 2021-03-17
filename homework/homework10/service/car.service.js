const { Car } = require('../database/model');
const { queryBuilder } = require('../helper');

module.exports = {
    createCar: (carObject) => Car.create(carObject),

    findAllCars: async (query) => {
        const {
            filters, keys, limit, page, sort, skip
        } = queryBuilder(query);

        const filterObject = {};

        keys.forEach(key => {
            switch (key) {
                case 'priceGte':
                    filterObject.price = { ...filterObject.price, $gte: +filters.priceGte };
                    break;
                case 'priceLte':
                    filterObject.price = { ...filterObject.price, $lte: +filters.priceLte };
                    break;
                case 'producer':
                    filterObject.producer = { $regex: filters.producer, $options: 'i' };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const cars = await Car.find(filterObject).limit(+limit).skip(skip).sort(sort);

        const count = await Car.countDocuments(filterObject);

        return {
            data: cars,
            count,
            limit,
            page,
            pages: Math.ceil(count / limit)
        };
    },

    findCarById: (carId) => Car.findById(carId),

    updateCarById: (carId, carObject) => Car.updateOne({ _id: carId }, carObject, { upsert: true }),

    deleteCarById: (carId) => Car.findByIdAndDelete(carId)
};
