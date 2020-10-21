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

app.get("/convert", async (req, res) => {
  try {
    const { query } = req;
    const { amount, from, to } = query;
    const data = await CurrencyService.convertAmount(amount, from, to);
    res.json(data);
  } catch (err) {
    const errorMsg =
      err && err.message ? err.message : "An error occurred, try again later";
    res.json({ error: errorMsg });
  }
});

app.listen(port, () => {
  console.log(`Currency API running in port:${8080}`);
  console.log(`Open http://localhost:${port}/ to see the status`);
  console.log(
    `Open http://localhost:${port}/hello-world to see a sample message`
  );
});
