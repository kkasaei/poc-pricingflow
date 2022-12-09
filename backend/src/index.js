const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");
const path = require("path");
const cors = require('cors')

require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/pricingflow");
const database = mongoose.connection;


app.use(cors())
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/cdn", express.static(path.join(__dirname, "cdn")));

app.use("/", routes);

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
  app.listen(3000, () => {
    console.log("server started");
  });
});

