const { Car } = require('../database/model');

module.exports = {
    createCar: (carObject) => Car.create(carObject),

    findAllCars: () => Car.find(),

    findCarById: (carId) => Car.findById(carId),

    updateCarById: (carId, carObject) => Car.updateOne({ _id: carId }, carObject, { upsert: true }),

    deleteCarById: (carId) => Car.findByIdAndDelete(carId)
};
