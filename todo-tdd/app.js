const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const app = express();
const mongodb = require("./mongodb//mongodb.connect");

mongodb.connect();

app.use(express.json());

app.use("/todos", todoRoutes);

app.use((error, req, res, next) => {
  //console.log(RangeError);
  res.statusCode(500).json({ message: error.message });
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

module.exports = app;
