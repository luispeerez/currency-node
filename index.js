const express = require("express");
const CurrencyService = require("./services/currency");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/hello-world", (req, res) => {
  res.send("Hello World!");
});

app.get("/exchange-rates", async (req, res) => {
  try {
    const { query } = req;
    const { from } = query;
    const rates = await CurrencyService.getAllExchangeRates(from);
    res.json({ from, rates });
  } catch (err) {
    const errorMsg =
      err && err.message ? err.message : "An error occurred, try again later";
    res.status(500).json({ error: errorMsg });
  }
});

app.get("/convert", async (req, res) => {
  try {
    const { query } = req;
    const { amount, from, to } = query;
    const convertedAmount = await CurrencyService.convertAmount(
      amount,
      from,
      to
    );
    res.json({ amount: convertedAmount });
  } catch (err) {
    const errorMsg =
      err && err.message ? err.message : "An error occurred, try again later";
    res.status(500).json({ error: errorMsg });
  }
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== "test") {
    console.log(`Currency API running in port:${8080}`);
    console.log(`Open http://localhost:${port}/ to see the status`);
    console.log(
      `Open http://localhost:${port}/hello-world to see a sample message`
    );
    console.log("");
    console.log(
      "Example of currency coverter, http://localhost:8080/convert?from=MXN&to=USD&amount=10"
    );
    console.log(
      "Example of currency list, http://localhost:8080/exchange-rates?from=MXN"
    );
  }
});

module.exports = app;
