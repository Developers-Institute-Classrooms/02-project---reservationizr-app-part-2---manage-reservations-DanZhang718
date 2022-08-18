const request = require("supertest");
const app = require("./app");
const restanrantsForTest = require("./testData/restanrantsForTest.json");

// User Story #1 - View all restaurants
describe("1 - View all restaurants", () => {
  it("GET /restanrants should return a list of restanrants and 200 status", async () => {
    const expectedStatus = 200;
    const expectedBody = restanrantsForTest;

    await request(app)
      .get("/restanrants")
      .expect(expectedStatus)
      .expect((res) => {
        expect(res.body).toEqual(expectedBody);
      });
  });
});
// ser Story #2 - View a single restaurant:happy and unhappy path
describe("2 - View a single restaurant", () => {
  it("GET /restanrants/:id should return a single restanrant", async () => {
    const expectedStatus = 200;
    const expectedBody = restanrantsForTest[0];
    await request(app)
      .get("/restanrants/616005cae3c8e880c13dc0b9")
      .expect(expectedStatus)
      .expect((res) => {
        expect(res.body).toEqual(expectedBody);
      });
  });
  it("GET /restanrants/:id should return 404 when request is a not exist id", async () => {
    const expectedStatus = 404;
    await request(app)
      .get("/restanrants/616005cae3c8e880c13dc0b0")
      .expect(expectedStatus);
  });
  it("GET /restanrants/:id should return 400 when request is an invalid id", async () => {
    const expectedStatus = 400;
    await request(app)
      .get("/restanrants/616005cae3c8e880c13")
      .expect(expectedStatus);
  });
});
// User Story #3 - Book a reservation

// User Story #4 - View all my reservations

// User Story #5 - View a single reservation
