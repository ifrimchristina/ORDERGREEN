const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { validateSession } = require("../middlewares/authenticator");

router.get("/", (req, res) => {
  try {
    let session = req.cookies["ordergreen-session-cookie"];
    let email = validateSession(session);

    if (email) {
      const filePath = path.join(__dirname, "../data.json");
      const file = fs.readFileSync(filePath);
      const data = JSON.parse(file);

      let user = data.users.find((user) => {
        return user.email == email;
      });

      res.send({ status: "Valid!", name: user.name });
    }
  } catch (err) {
    res.send({ status: "Invalid!" });
  }
});

module.exports = router;
