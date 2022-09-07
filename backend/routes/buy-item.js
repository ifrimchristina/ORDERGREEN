const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.put("/:id", (req, res) => {
  // Open json file
  const filePath = path.join(__dirname, "../data.json");
  const file = fs.readFileSync(filePath);
  let data = JSON.parse(file);

  try {
    // Get item with id from request
    let item = data.items.find((item) => {
      return item.id == req.params.id;
    });
    // Update item quantity
    if (item.qty > 0) {
      item.qty--;

      // Write new data to json file
      fs.writeFileSync(filePath, JSON.stringify(data));
      res.send({status: "Bought!"});
    } else {
      res.send({status: "Item out of stock!"});
    }

    // Write to json file
  } catch (err) {
    console.log(err);
    res.send({status: "Error buying item!"});
  }
});

module.exports = router;
