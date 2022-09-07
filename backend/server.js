const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { authenticate } = require("./middlewares/authenticator");

const session_route = require("./routes/session");
const login_route = require("./routes/login");
const signup_route = require("./routes/signup");
const get_items_route = require("./routes/get-items");
const check_stock_route = require("./routes/check-stock");
const delete_item_route = require("./routes/delete-item");
const buy_item_route = require("./routes/buy-item");
const contact_route = require("./routes/contact");

const PORT = 3001;


app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/session", session_route);
app.use("/login", login_route);
app.use("/signup", signup_route);

app.use(authenticate);

app.use("/get-items", get_items_route);
app.use("/delete-item", delete_item_route);
app.use("/buy-item", buy_item_route);
app.use("/contact", contact_route);
app.use("/check-stock", check_stock_route);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
