const express = require("express");
const { bot } = require("./bot.js");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/scrape", (req, res) => {
  bot(10000,10000, res);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
