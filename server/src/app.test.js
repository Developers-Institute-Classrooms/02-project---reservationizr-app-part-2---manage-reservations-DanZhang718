const request = require("supertest");
const app = require("./app");
const restanrantsForTest = require("./testData/restanrantsForTest.json");

describe("app", () => {
  it("GET /restanrants should return a list of restanrants", async () => {
    const expectedStatus = 200;
    const expectedBody = restanrantsForTest;

    await request(app)
      .get("/restanrants")
      .expect(expectedStatus)
      .expect((res) => {
        expect(res.body).toEqual(expectedBody);
        console.log(res.body);
      });
  });
});
