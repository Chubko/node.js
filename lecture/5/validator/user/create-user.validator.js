const Joi = require('joi');

const { regexpEnum } = require('../../constant');

const girlSubScheme = Joi.array().items(
    Joi.object({
        name: Joi.string().alphanum().max(20)
    })
);

module.exports = Joi.object({
    name: Joi.string().alphanum().min(2).max(50)
        .allow('%#$'), // allow означає як виняток
    email: Joi.string().regex(regexpEnum.EMAIL_REGEXP).required(),
    // email: Joi.string().email(),
    password: Joi.string().regex(regexpEnum.PASSWORD_REGEXP).required(),
    car: Joi.boolean(),
    // age: Joi.number().integer().min(3).max(120),
    // yearOfBirth: Joi.number().integer().min(constants.CURRENT_YEAR - 100).max(constants.CURRENT_YEAR),
    girls: girlSubScheme.optional().when('car',
        { is: true, then: Joi.required() }) // не обовязкове поле. коли car буде true, тоді обовязкове
});
