const app = require("./index");
const request = require("supertest");

describe("GET /", function () {
  it("should respond with status ok", function () {
    return request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ status: "ok" });
      });
  });
});

describe("GET /hello-world", function () {
  it("should return a Hello World! message", function () {
    return request(app)
      .get("/hello-world")
      .expect(200)
      .then((response) => {
        expect(response.text).toEqual("Hello World!");
      });
  });
});

describe("GET /convert", function () {
  it("should return the conversion of the param amount, using the from and to params", function () {
    return request(app)
      .get("/convert")
      .query({ amount: 10, from: "MXN", to: "USD" })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.amount).toBeTruthy();
        expect(Number.isFinite(response.body.amount)).toEqual(true);
      });
  });

  it("should return an error if the from currency code is not valid", function () {
    return request(app)
      .get("/convert")
      .query({ amount: 10, from: "INVALID_CODE", to: "USD" })
      .expect(500)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toBeTruthy();
        expect(response.body).toEqual({
          error: `The currency code of the amount is invalid: INVALID_CODE`,
        });
      });
  });

  it("should return an error if the to currency code is not valid", function () {
    return request(app)
      .get("/convert")
      .query({ amount: 10, from: "MXN", to: "ANOTHER_INVALID_CODE" })
      .expect(500)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toBeTruthy();
        expect(response.body).toEqual({
          error: `The currency code to convert is invalid: ANOTHER_INVALID_CODE`,
        });
      });
  });
});

describe("GET /exchange-rates", function () {
  it("should return an object with the exchange rates for the given currency", function () {
    return request(app)
      .get("/exchange-rates")
      .query({ from: "MXN" })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.from).toEqual("MXN");
        expect(response.body.rates).toBeTruthy();
        expect(response.body.rates["USD"]).toBeTruthy();

        // Asuming USD has more than MXN
        expect(response.body.rates["USD"]).toBeGreaterThan(1);
      });
  });
});
