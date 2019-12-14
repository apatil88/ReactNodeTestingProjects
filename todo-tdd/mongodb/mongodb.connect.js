const mongoose = require("mongoose");
//mongodb://<dbuser>:<dbpassword>@ds353378.mlab.com:53378/todo-tdd-2019

async function connect() {
  try {
    await mongoose.connect(
      "mongodb://SuperTestUser:SuperTestUser1@ds353378.mlab.com:53378/todo-tdd-2019",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (err) {
    console.log("Error connecting to mongodb");
    console.log(err);
  }
}

module.exports = { connect };
