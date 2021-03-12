const { model, Schema } = require('mongoose');

const { databaseTables: { CAR, USER } } = require('../../constant');

const userScheme = new Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 3, max: 100 },
    email: { type: String, required: true, unique: true },
    password: {
        type: String, required: true, maxlength: 100, select: false
    },
    avatar: { type: String },
    cars: [{ type: Schema.Types.ObjectId }]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userScheme.virtual('userCars', {
    ref: CAR,
    localField: 'cars',
    foreignField: '_id'
});

userScheme
    .pre('find', function() {
        this.populate('userCars');
    })
    .pre('findOne', function() {
        this.populate('userCars');
    });

module.exports = model(USER, userScheme);
