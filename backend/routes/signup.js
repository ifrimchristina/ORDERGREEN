const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

router.post("/", (req, res) => {
  // Open json file
  const filePath = path.join(__dirname, "../data.json");
  const file = fs.readFileSync(filePath);
  const data = JSON.parse(file);

  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  let user = data.users.find((user) => {
    return user.email == email;
  });

  if (user) {
    res.send({ status: "User already exists!" });
  } else {
    let hashed_password = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    let new_user = {
      email: email,
      password: hashed_password,
      name: name,
      surveys: {},
      session: null,
    };
    data.users.push(new_user);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.send({ status: "Successful!" });
  }
});

module.exports = router;
