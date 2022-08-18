const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const RestanrantModel = require("./models/RestaurantModel");
const formatRestanrant = require("./formatRestanrant");

app.use(cors());
app.use(express.json());

// User Story #1 - View all restaurants
app.get("/restanrants", async (req, res) => {
  const restanrants = await RestanrantModel.find({});
  return res.status(200).send(restanrants.map(formatRestanrant));
});
// ser Story #2 - View a single restaurant
app.get("/restanrants/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "id is unavild" });
  }

  const oneRestanrant = await RestanrantModel.findById(id);
  if (oneRestanrant === null) {
    return res.status(404).send("not found");
  }
  return res.status(200).send(formatRestanrant(oneRestanrant));
});
// User Story #3 - Book a reservation

// User Story #4 - View all my reservations

// User Story #5 - View a single reservation
module.exports = app;
