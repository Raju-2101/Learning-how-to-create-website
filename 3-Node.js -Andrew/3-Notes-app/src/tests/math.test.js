require("dotenv").config();
const { FTC, CTF } = require("../math");

test("FTC", () => {
  expect(FTC(32)).toBe(0);
});

test("CTF", () => {
  expect(CTF(0)).toBe(32);
});
