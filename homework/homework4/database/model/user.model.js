const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 18 },
    cars: [{ type: Schema.Types.ObjectId }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.virtual('userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id'
});

userSchema
    .pre('find', function() {
        this.populate('userCars');
    })
    .pre('findOne', function() {
        this.populate('userCars');
    });

module.exports = model('User', userSchema);
