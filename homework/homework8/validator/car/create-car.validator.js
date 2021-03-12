const Joi = require('joi');

module.exports = Joi.object({
    producer: Joi.string().required(),
    price: Joi.number().required()
});
