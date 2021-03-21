const Joi = require('joi');

module.exports = Joi.object({
    producer: Joi.string().alphanum().required(),
    price: Joi.number().required(),
    year: Joi.number().integer().required(),
    user_id: Joi.number().required()
});
