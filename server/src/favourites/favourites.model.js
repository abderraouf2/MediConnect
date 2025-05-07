const mongoose = require("mongoose");

const FavouritesSchema = mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  createdAt: { type: Date, default: Date.now },
});

const Favourite = mongoose.model("Favourite", FavouritesSchema);

module.exports = Favourite;
