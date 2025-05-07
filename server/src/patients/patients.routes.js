const express = require("express");
const router = express.Router();
const {
  createNewPatient,
  signin,
  getPatientData,
} = require("./patients.controller");
router.get("/", async (req, res) => {
  console.log("patinets route");
  return res.status(200).json({ message: "patients" });
});

router.post("/new", createNewPatient);
router.post("/signin", signin);
router.get("/patientData", getPatientData);

router.post("/logout", (req, res) => {
  const token = req.cookies.patientToken;
  console.log({ token });
  let options = {};
  options = {
    maxAge: 0, // Set maxAge to 0 to delete the cookie
  };
  res.clearCookie("patientToken", options);

  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
