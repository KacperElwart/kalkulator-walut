const input = require("./input");

test("check if user input is tha same as currency name", () => {
  expect(input()).toMatch("USD");
});
