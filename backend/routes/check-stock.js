const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/:id", (req, res) => {
  // Open json file
  const filePath = path.join(__dirname, "../data.json");
  const file = fs.readFileSync(filePath);
  const data = JSON.parse(file);

  let item = data.items.find((item) => {
    if (item.id == req.params.id) return item;
  });


  if (item && item.qty > 0) {
    res.json({ inStock: true });
  } else {
    res.json({ inStock: false });
  }
});

module.exports = router;
