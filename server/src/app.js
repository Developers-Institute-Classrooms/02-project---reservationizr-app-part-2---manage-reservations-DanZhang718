const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { celebrate, errors, Segments } = require("celebrate");
const RestaurantModel = require("./models/RestaurantModel");
const ReservationModel = require("./models/ReservationModel");
const formatRestaurant = require("./formatRestaurant");
const formatRservation = require("./formatReservation");
const reservationSchema = require("./models/reservationSchema");
const { auth } = require("express-oauth2-jwt-bearer");

app.use(cors());
app.use(express.json());

const checkJwt = auth({
  audience: "https://reservationizr.com",
  issuerBaseURL: `https://dev-o3716vt8.us.auth0.com/`,
});

// User Story #1 - View all restaurants
app.get("/restaurants", async (req, res) => {
  const restaurants = await RestaurantModel.find({});
  return res.status(200).send(restaurants.map(formatRestaurant));
});
// ser Story #2 - View a single restaurant
app.get("/restaurants/:id", async (req, res) => {
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
app.post(
  "/reservations",
  checkJwt,
  celebrate({ [Segments.BODY]: reservationSchema }),
  async (req, res, next) => {
    try {
      const { body } = req;
      // const reservationBody = {
      //   userId: auth.payload.sub,
      //   ...body,
      // };
      const reservation = new ReservationModel(body);
      await reservation.save();
      return res.status(201).send(formatRservation(reservation));
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

// User Story #4 - View all my reservations

// User Story #5 - View a single reservation

app.use(errors());
module.exports = app;
