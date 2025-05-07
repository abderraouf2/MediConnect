const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDB() {
  try {
    await mongoose
      .set("strictQuery", false)
      .connect(process.env.DB_URI, {
        dbName: "smart-brain-docker", // <-- this sets the DB name
      })
      .then(() => console.log("connected to the database!"))
      .catch((err) => console.log(err));
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectToDB;
