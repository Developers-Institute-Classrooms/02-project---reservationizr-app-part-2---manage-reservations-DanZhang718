const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { celebrate, errors, Segments } = require("celebrate");
const { auth } = require("express-oauth2-jwt-bearer");
const RestaurantModel = require("./models/RestaurantModel");
const ReservationModel = require("./models/ReservationModel");
const formatRestaurant = require("./formatRestaurant");
const formatReservation = require("./formatReservation");
const reservationSchema = require("./models/reservationSchema");

const app = express();
const checkJwt = auth({
  audience: "https://reservationizr.com",
  issuerBaseURL: `https://dev-o3716vt8.us.auth0.com/`,
});

app.use(cors());
app.use(express.json());

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
      const { body, auth } = req;
      const reservationBody = {
        userId: auth.payload.sub,
        ...body,
      };
      const addreservation = new ReservationModel(reservationBody);
      await addreservation.save();
      return res.status(201).send(formatReservation(addreservation));
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

// User Story #4 - View all my reservations
app.get("/reservations", checkJwt, async (req, res) => {
  const { auth } = req;
  const reservations = await ReservationModel.find({
    userId: auth.payload.sub,
  });
  console.log(reservations);
  if (reservations === null) {
    return res.status(404).send({ error: "not found" });
  }
  return res.status(200).send(reservations.map(formatReservation));
});

// User Story #5 - View a single reservation
app.get("/reservations/:id", checkJwt, async (req, res, next) => {
  try {
    const { auth } = req;
    console.log(auth);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: "id is unavild" });
    }
    const oneReservation = await ReservationModel.findById(id);
    console.log(oneReservation);
    if (oneReservation === null || oneReservation.userId !== auth.payload.sub) {
      return res.status(404).send({ error: "not found" });
    }
    return res.status(200).send(formatReservation(oneReservation));
  } catch (error) {
    error.status = 400;
    next(error);
  }
});
app.use(errors());
module.exports = app;
