// FIXME: Add a Mongoose model here
const mongoose = require("mongoose");
const { Scheam } = mongoose;

const restanrantSchema = new Scheam({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});
const Restanrant = mongoose.model("Restanrant", restanrantSchema);
module.exports = Restanrant;
