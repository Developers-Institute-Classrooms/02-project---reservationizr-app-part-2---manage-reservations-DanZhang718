const request = require("supertest");
const app = require("./app");
const restaurantsForTest = require("./testData/restaurantsForTest.json");

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

// User Story #4 - View all my reservations

// User Story #5 - View a single reservation
