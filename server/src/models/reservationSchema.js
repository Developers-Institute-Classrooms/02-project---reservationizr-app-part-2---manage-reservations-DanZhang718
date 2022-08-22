const Joi = require("joi");

const reservationSchema = Joi.object({
  partySize: Joi.number().required().min(0),
  date: Joi.date().required().min("now"),
  restaurantName: Joi.string().required(),
});
module.exports = reservationSchema;
