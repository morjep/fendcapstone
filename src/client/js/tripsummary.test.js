import { buildInnerHtml } from "./tripsummary";

test("check string is build correctly (also testing interface assumptions", () => {
  const data = {
    city: "Aalborg",
    country: "Denmark",
    travelDate: "01-04-2022",
  };
  const resultString = "<h1>Destination: Aalborg, Denmark</h1><h2>Traveldate: 01-04-2022 </h2>";
  expect(buildInnerHtml(data)).toBe(resultString);
});
