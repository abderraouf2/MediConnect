const express = require("express");
const {
  getPatientFavourites,
  addFavouriteDoctor,
  removeFavouriteDoctor,
} = require("./favourites.controller");

const router = express.Router();

router.get("/", getPatientFavourites);
router.post("/:doctorId", addFavouriteDoctor);
router.delete("/:doctorId", removeFavouriteDoctor);

module.exports = router;
