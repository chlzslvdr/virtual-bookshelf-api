const Joi = require("joi");

const bookCreateSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  status: Joi.string().valid("Want to Read", "Currently Reading", "Read").required(),
});

const bookUpdateSchema = Joi.object({
  status: Joi.string().valid("Want to Read", "Currently Reading", "Read"),
  cover_url: Joi.string().uri(),
}).min(1);

module.exports = {
  bookCreateSchema,
  bookUpdateSchema,
};
