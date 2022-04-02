import { getNumberOfDays } from "./days_util";

test("days from 01-03-2022 to 10-03-2022 equal 9", () => {
  const today = new Date();
  const futureDate = new Date(today.getTime() + 9 * 24 * 60 * 60 * 1000);

  expect(getNumberOfDays(today, futureDate)).toBe(9);
});

test("days from 01-03-2022 to 01-03-2022 equal 0", () => {
  expect(getNumberOfDays("01-03-2022", "01-03-2022")).toBe(0);
});
