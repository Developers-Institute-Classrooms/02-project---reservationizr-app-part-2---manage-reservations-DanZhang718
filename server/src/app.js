const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const RestaurantModel = require("./models/RestaurantModel");
const formatRestaurant = require("./formatRestanrant");

app.use(cors());
app.use(express.json());

// User Story #1 - View all restaurants
app.get("/restaurants", async (req, res) => {
  console.log(req);
  const restaurants = await RestaurantModel.find({});
  return res.status(200).send(restaurants.map(formatRestaurant));
});
// ser Story #2 - View a single restaurant
app.get("/restaurants/:id", async (req, res) => {
  console.log(req);
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "id is unavild" });
  }
  const oneRestaurant = await RestaurantModel.findById(id);
  if (oneRestaurant === null) {
    return res.status(404).send({ error: "not found" });
  }
  return res.status(200).send(formatRestaurant(oneRestaurant));
});
// User Story #3 - Book a reservation

// User Story #4 - View all my reservations

// User Story #5 - View a single reservation
module.exports = app;
