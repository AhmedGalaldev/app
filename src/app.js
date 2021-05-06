const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./auth/passport");
const middlewares = require("./middlewares")

require("./models")


const routes = require("./routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});


app.use("/api", routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
module.exports = app;