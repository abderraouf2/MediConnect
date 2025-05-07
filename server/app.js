const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3001", // exact origin, not "*"
    credentials: true, // allow cookies, headers, etc.
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "1mb", extended: true }));

app.get("/", (req, res) => {
  console.log("Received a request to /");
  res.send("Hello world!");
});

app.use("/api/patients", require("./src/patients/patients.routes"));
app.use("/api/doctors", require("./src/doctors/doctors.routes"));
app.use("/api/favourites", require("./src/favourites/favourites.routes"));

module.exports = app;
