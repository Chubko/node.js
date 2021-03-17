const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(50)
        .required(),
    age: Joi.number()
        .integer()
        .min(3)
        .max(110)
        .required(),
    gender: Joi.string()
        .valid('female', 'male')
        .required(),
});
