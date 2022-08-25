const request = require("supertest");
const app = require("./app");
const restaurantsForTest = require("./testData/restaurantsForTest.json");
const reservationsForTest = require("./testData/reservationsForTest.json");
// User Story #1 - View all restaurants
describe("1 - View all restaurants", () => {
  it("GET /restaurants should return a list of restaurants and 200 status", async () => {
    const expectedStatus = 200;
    const expectedBody = restaurantsForTest;

    await request(app)
      .get("/restaurants")
      .expect(expectedStatus)
      .expect((res) => {
        expect(res.body).toEqual(expectedBody);
      });
  });
});
// ser Story #2 - View a single restaurant:happy and unhappy path
describe("2 - View a single restaurant", () => {
  it("GET /restaurants/:id should return a single restaurant", async () => {
    const expectedStatus = 200;
    const expectedBody = restaurantsForTest[0];
    await request(app)
      .get("/restaurants/616005cae3c8e880c13dc0b9")
      .expect(expectedStatus)
      .expect((res) => {
        expect(res.body).toEqual(expectedBody);
      });
  });
  it("GET /restaurants/:id should return 404 when request is a not exist id", async () => {
    const expectedStatus = 404;
    await request(app)
      .get("/restaurants/616005cae3c8e880c13dc0b0")
      .expect(expectedStatus);
  });
  it("GET /restaurants/:id should return 400 when request is an invalid id", async () => {
    const expectedStatus = 400;
    await request(app)
      .get("/restaurants/616005cae3c8e880c13")
      .expect(expectedStatus);
  });
});
// User Story #3 - Book a reservation
describe("3 - Book a reservation", () => {
  it("POST /reservatons creates a new reservation", async () => {
    const expectedStatus = 201;
    const body = {
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      restaurantName: "Island Grill",
    };

    await request(app)
      .post("/reservations")
      .send(body)
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expect.objectContaining(body));
        expect(response.body.id).toBeTruthy();
      });
  });
  it("POST /reservatons returns a 400 when a negative partySize is used", async () => {
    const expectedStatus = 400;
    const body = {
      partySize: -2,
      date: "2023-11-17T06:30:00.000Z",
      restaurantName: "Island Grill",
    };
    await request(app).post("/reservations").send(body).expect(expectedStatus);
  });
  it("POST /reservatons returns a 400 when a past date used", async () => {
    const expectedStatus = 400;
    const body = {
      partySize: 4,
      date: "2021-11-17T06:30:00.000Z",
      restaurantName: "Island Grill",
    };
    await request(app).post("/reservations").send(body).expect(expectedStatus);
  });
});

// User Story #4 - View all my reservations
describe("4 - View all my reservations", () => {
  it("GET /reservations should return a list of reservations and 200 status", async () => {
    const expectedStatus = 200;
    const expectedBody = reservationsForTest;

    await request(app)
      .get("/reservations")
      .expect(expectedStatus)
      .expect((res) => {
        expect(res.body).toEqual(expectedBody);
      });
  });
});
// User Story #5 - View a single reservation
describe("5 - View a single reservation", () => {
  it("GET /reservations/:id should return a single reservation", async () => {
    const expectedStatus = 200;
    const expectedBody = reservationsForTest[1];
    await request(app)
      .get("/reservations/614abf0a93e8e80ace792ac6")
      .expect(expectedStatus)
      .expect((res) => {
        expect(res.body).toEqual(expectedBody);
      });
  });
  it("GET /reservations/:id should return 404 when the reservation is not belong to loggedin customer", async () => {
    const expectedStatus = 404;
    await request(app)
      .get("/reservations/63055b897500ed3a99b38c34")
      .expect(expectedStatus);
  });
  it("GET /reservations/:id should return 400 when request is an invalid id", async () => {
    const expectedStatus = 400;
    await request(app)
      .get("/reservations/616005cae3c8e880c13")
      .expect(expectedStatus);
  });
});
