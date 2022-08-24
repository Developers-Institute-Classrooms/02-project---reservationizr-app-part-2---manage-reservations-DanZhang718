const formatRestaurant = require("./formatRestaurant");

describe("formatRestaurant", () => {
  it("should format a restaurant from Mongoose to API spec", () => {
    const validRestaurant = {
      name: "Italian Feast",
      description:
        "From the Italian classics, to our one-of-a-kind delicious Italian favourites, all of our offerings are handcrafted from the finest, freshest ingredients available locally. Whether you're craving Italian comfort food like our Ravioli, Pappardelle or something with a little more Flavour like our famous Fettuccine Carbonara.",
      image: "https://i.ibb.co/0r7ywJg/italian.jpg",
    };
    const received = formatRestaurant({
      _id: "616bd284bae351bc447ace5b",
      __v: 0,
      ...validRestaurant,
    });
    const expected = {
      ...validRestaurant,
      id: "616bd284bae351bc447ace5b",
    };
    expect(received).toEqual(expected);
  });
});
