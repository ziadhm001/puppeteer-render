const express = require("express");
const { bot } = require("./bot.js");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/scrape/:firstPage/:secondPage/:hits", async (req, res) => {
  res.status(200).send({ success: true });
  console.log("sent response");
  // Method 1:
  await bot(parseInt(req.params.firstPage),parseInt(req.params.secondPage), parseInt(req.params.hits));
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
