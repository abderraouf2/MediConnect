// import bcrypt from "bcrypt";
const bcrypt = require("bcryptjs");
const Patient = require("./patients.model");
const jwt = require("jsonwebtoken");
const decodToken = require("../../helpers/decodToken");

const createNewPatient = async (req, res) => {
  try {
    const { password, confirm_password, email, ...rest } = req.body;

    const existingPatient = await Patient.find({ email: email });

    if (existingPatient) {
      return res.status(400).json({ message: "Email already registred" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newPatient = {
      ...rest,
      email: email,
      password: hashedPassword,
    };

    await Patient.create(newPatient);

    res.status(201).json({ message: "Patient created", patient: newPatient });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  try {
    const existingPatient = await Patient.findOne({ email: email });
    console.log({ existingPatient });
    if (!existingPatient) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    let correctPass = bcrypt.compareSync(password, existingPatient.password); // true

    if (!correctPass) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign(
      {
        email: existingPatient.email,
        id: existingPatient._id,
      },
      process.env.SECRET_WORD,
      {
        expiresIn: "24h",
      }
    );
    let options = {};
    //   if (process.env.ENV == "DEV") {
    options = {
      maxAge: 1000 * 60 * 60 * 24, // Cookie expires in 1 hour
    };
    //   }
    //   if (process.env.ENV == "PRODUCTION") {
    //     options = {
    //       domain: "car-nest.app",
    //       sameSite: "none",
    //       secure: true,
    //       path: "/",
    //       maxAge: 1000 * 60 * 60 * 24, // Cookie expires in 1 hour
    //     };
    //   }

    res.cookie("patientToken", token, options);

    return res.status(200).json({
      patientData: {
        first_name: existingPatient.first_name,
        last_name: existingPatient.last_name,
      },
    });
  } catch (error) {
    console.error("Error singin patient:", error);
    res.status(500).json({ message: error.message });
  }
};

const getPatientData = async (req, res) => {
  const token = req.cookies.patientToken;

  try {
    const decoded = decodToken(token);

    if (decoded === "error") {
      return res.status(401).json({
        title: "unauthorized",
      });
    }
    const patient = await Patient.findOne({ email: decoded.email });
    return res.status(200).json({
      patientData: {
        first_name: patient.first_name,
        last_name: patient.last_name,
      },
    });
  } catch (error) {
    console.error("Error singin patient:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewPatient,
  signin,
  getPatientData,
};
