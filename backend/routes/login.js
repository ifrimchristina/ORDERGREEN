const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { generateSession } = require("../middlewares/authenticator");

router.post("/", (req, res) => {
  if (req?.cookies?.session) {
    let session = req.cookies["ordergreen-session-cookie"];
    let user = validateSession(session);
    if (user) {
      res.redirect("/");
    }
  }

  // Open json file
  const filePath = path.join(__dirname, "../data.json");
  const file = fs.readFileSync(filePath);
  const data = JSON.parse(file);

  let email = req.body.email;
  let password = req.body.password;

  console.log({ email, password });

  let hashed_password = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  let user = data.users.find((user) => {
    return user.email == email;
  });

  if (user) {
    if (user.password == hashed_password) {
      let session = generateSession(email);
      console.log({ session });
      res.cookie("ordergreen-session-cookie", session, {
        expires: 0,
      });
      res.send({ status: "Successful!" });
    } else {
      res.send({ status: "Wrong password!" });
    }
  } else {
    res.send({ status: "User not found!" });
  }
});

module.exports = router;
