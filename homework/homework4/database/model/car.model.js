const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    producer: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = model('Car', carSchema);
