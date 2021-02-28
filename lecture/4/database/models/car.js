const { Schema, model } = require('mongoose');

// const carSchema = new Schema({
//     model: { type: String },
//     price: { type: Number }
// }, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });
const carSchema = new Schema({
    model: { type: String },
    price: { type: Number }
});

module.exports = model('Car', carSchema);
