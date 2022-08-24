const formatReservation = require("./formatReservation");

describe("formatReservation", () => {
  it("should format a reservation from Mongoose to API spec", () => {
    const validReservation = {
      partySize: 2,
      date: { $date: "2023-12-03T07:00:00.000Z" },
      userId: "another-user-id",
      restaurantName: "Green Curry",
    };
    const received = formatReservation({
      _id: "61679189b54f48aa6599a7fd",
      __v: 0,
      ...validReservation,
    });
    const expected = {
      ...validReservation,
      id: "61679189b54f48aa6599a7fd",
    };
    expect(received).toEqual(expected);
  });
});
