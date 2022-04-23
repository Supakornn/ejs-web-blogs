const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

app.use(cookieParser("Secure"));
app.use(
  session({
    secret: "SecretSession",
    saveUninitialized: true,
    resave: false
  })
);
app.use(flash());
app.use(fileUpload());

app.set("layout", "./layouts/main.ejs");
app.set("view engine", "ejs");

const routes = require("./server/routes/mainRoutes");
app.use("/", routes);

app.listen(port, () => console.log("Server is running on port " + port));
