const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.urlencoded({ extend: true }));
app.use(express.static("public"));

app.set("layout", "./layouts/main");

const routes = require("./server/routes/mainRoutes");
app.use("/", routes);

app.listen(port, () => console.log("Server is running on port " + port));
