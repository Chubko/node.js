const { model, Schema } = require('mongoose');

const { databaseTables: { CAR } } = require('../../constant');

const carScheme = new Schema({
    producer: { type: String, required: true },
    price: { type: Number, required: true },
    photos: [{ type: String }],
    docs: [{ type: String }]
});

module.exports = model(CAR, carScheme);
