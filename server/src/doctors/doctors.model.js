const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip_code: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  years_experience: {
    type: Number,
    min: 0,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
