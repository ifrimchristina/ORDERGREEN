const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.delete("/:id", (req, res) => {
  // Open json file
  const filePath = path.join(__dirname, "../data.json");
  const file = fs.readFileSync(filePath);
  const data = JSON.parse(file);

  try {
    // Delete item with id from request
    data.items = data.items.filter((item) => {
      if (item.id != req.params.id) return item;
    });

    // Write to json file
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.send("Item deleted");
  } catch (err) {
    console.log(err);
    res.send("Error deleting item");
  }
});

module.exports = router;
