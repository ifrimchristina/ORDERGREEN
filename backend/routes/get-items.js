const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  // Print cookies
  console.log(req.cookies);

  // Open json file
  const filePath = path.join(__dirname, "../data.json");
  const file = fs.readFileSync(filePath);
  const data = JSON.parse(file);

  res.send(data.items);
});

module.exports = router;
