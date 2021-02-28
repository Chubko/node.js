const { Schema, model } = require('mongoose');

// const carSchema = {
//     model: { type: String },
//     price: { type: Number }
// };

const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 15 },
    // cars: { type: Array } // будь-який масив
    // cars: [carSchema]
    // cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }] // варіант для звязки даних ріхних таблиць через посилання
    cars: [{ type: Schema.Types.ObjectId }] // звязка через вірт поля
    // cars: [{ type: Schema.Types.Mixed }] // не буде перевіряти валідність типів
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual('Fullname').get(function() {
    const lastName = 'ppppp';
    return `${this.name} ${lastName}`;
});

userSchema.virtual('userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id',
    // justOne: true, // по замовч. вертає масив. Якщо задати цю опцію, то верне обєкт
    // options: {
    //     select: 'price', // для відображення конкретних полів
    //     sort: {} // можна сортувати, match і тд.
    // }
});

userSchema
    .pre('find', function() {
        this.populate('userCars');
    })
    .pre('findOne', function() {
        this.populate('userCars');
    });
module.exports = model('User', userSchema);
