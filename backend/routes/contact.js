const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
  console.log(req.cookies);
  // Open json file
  const filePath = path.join(__dirname, "../data.json");
  const file = fs.readFileSync(filePath);
  let data = JSON.parse(file);

  //   let email = res.locals.email;
  let email = "christina.ifrim@og.com";
  let user = data.users.find((user) => {
    return user.email == email;
  });

  let now_time = Date.now();

  user.surveys[now_time] = req.body;

  fs.writeFileSync(filePath, JSON.stringify(data));

  res.send("Survey submitted!");
});

module.exports = router;
