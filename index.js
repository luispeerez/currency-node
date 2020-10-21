const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/hello-world", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Currency API running in port:${8080}`);
  console.log(`Open http://localhost:${port}/ to see the status`);
  console.log(
    `Open http://localhost:${port}/hello-world to see a sample message`
  );
});
