const calculate = require("./calculate");

test("multiplying user input and actuall rate of currency", () => {
  expect(calculate(2, 1.12)).toBe(2.24);
});
