const path = require("path");
const fs = require("fs");
const { v1: uuidv1 } = require("uuid");

function generateSession(email) {
  const filePath = path.join(__dirname, "../data.json");
  const file = fs.readFileSync(filePath);
  let data = JSON.parse(file);
  let user = data.users.find((user) => {
    return user.email == email;
  });

  const existing_session = user.session;
  if (existing_session) return existing_session;

  var uuid = uuidv1();

  let session = `${email}:${uuid}`;
  let encoded_session = Buffer.from(session).toString("base64");

  user.session = encoded_session;

  fs.writeFileSync(filePath, JSON.stringify(data));

  console.log({ encoded_session });
  return encoded_session;
}

// Returns the user's id if session is valid
function validateSession(session_cookie) {
  let decoded_cookie = Buffer.from(session_cookie, "base64").toString("ascii");
  let parts = decoded_cookie.split(":");
  const [email, uuid] = parts;

  const filePath = path.join(__dirname, "../data.json");
  const file = fs.readFileSync(filePath);
  let data = JSON.parse(file);

  if (
    data.users.find(
      (user) => user.email == email && user.session == session_cookie
    )
  ) {
    return email;
  } else {
    return null;
  }
}

function authenticate(req, res, next) {
  console.log(req.cookies);
  if (req?.cookies["ordergreen-session-cookie"]) {
    let user = validateSession(req.cookies["ordergreen-session-cookie"]);

    if (user) {
      res.locals.user = user;
      next();
    } else {
      // Redirect to login
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
}

module.exports = { authenticate, generateSession, validateSession };
