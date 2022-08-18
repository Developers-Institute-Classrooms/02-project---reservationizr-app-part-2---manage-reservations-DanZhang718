const express = require("express");
const cors = require("cors");
const app = express();
// const mongoose = require("mongoose");
const RestanrantModel = require("./models/RestaurantModel");
const formatRestanrant = require("./formatRestanrant");

app.use(cors());
app.use(express.json());

// get all restanrants
app.get("/restanrants", async (req, res) => {
  const restanrants = await RestanrantModel.find({});
  console.log(restanrants);
  return res.status(200).send(restanrants.map(formatRestanrant));
});

module.exports = app;
