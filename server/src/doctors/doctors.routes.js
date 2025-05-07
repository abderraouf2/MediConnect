const express = require("express");
const router = express.Router();

const {
  addAllDoctorsToDb,
  getAllDoctors,
  searchDoctors,
} = require("./doctors.controller");

router.get("/", getAllDoctors);
// router.get("/addAll", addAllDoctorsToDb);

router.get("/search", searchDoctors);

module.exports = router;
