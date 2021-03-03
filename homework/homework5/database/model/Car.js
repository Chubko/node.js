const { model, Schema } = require('mongoose');

const { databaseTables: { CAR } } = require('../../constant');

const carScheme = new Schema({
    producer: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = model(CAR, carScheme);
