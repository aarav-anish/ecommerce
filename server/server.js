require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// app
const app = express();

// middlewares
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));

// mongoose connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("MongoDB connection established."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

app.get("/api", (req, res) => {
  res.send("This is a node api");
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started running on ${port}`);
});
