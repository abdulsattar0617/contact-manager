const Joi = require("joi");

module.exports.contactSchema = Joi.object({
  contact: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    phonenumber: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required()
      .messages({
        "any.required": "Phone number is required.",
        "string.empty": "Phone number cannot be empty.",
        "string.length": "Phone number must be exactly 10 digits long.",
        "string.pattern.base": "Phone number is invalid.",
      }),
  }).required(),
});
