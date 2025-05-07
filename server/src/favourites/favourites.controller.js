const decodToken = require("../../helpers/decodToken");
const Favourite = require("./favourites.model");

const addFavouriteDoctor = async (req, res) => {
  const token = req.cookies.patientToken;
  const { doctorId } = req.params;

  try {
    const decoded = decodToken(token);

    if (decoded === "error") {
      return res.status(401).json({
        title: "unauthorized",
      });
    }

    const existing = await Favourite.findOne({
      patient: decoded.id,
      doctor: doctorId,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Doctor already in favourite list" });
    }

    const favourite = new Favourite({
      patient: decoded.id,
      doctor: doctorId,
    });

    await favourite.save();

    console.log({ favourite });
    res.status(200).json({ favourite: true });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: error.message });
  }
};

const getPatientFavourites = async (req, res) => {
  const token = req.cookies.patientToken;

  try {
    const decoded = decodToken(token);

    if (decoded === "error") {
      return res.status(401).json({
        title: "unauthorized",
      });
    }

    const favourites = await Favourite.find({
      patient: decoded.id,
    }).populate("doctor");

    // Add favourite: true to each doctor
    const favouriteDoctors = favourites
      .map((f) => {
        if (!f.doctor) return null; // In case doctor is deleted
        const doc = f.doctor.toObject?.() || f.doctor; // Support both lean and non-lean docs
        return { ...doc, favourite: true };
      })
      .filter(Boolean); // remove nulls

    res.status(200).json({ doctors: favouriteDoctors });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: error.message });
  }
};

const removeFavouriteDoctor = async (req, res) => {
  const token = req.cookies.patientToken;
  const { doctorId } = req.params; // Get the doctorId from the request parameters

  try {
    const decoded = decodToken(token); // Decode the token to get the patient info

    if (decoded === "error") {
      return res.status(401).json({
        title: "unauthorized",
      });
    }

    // Find the favourite entry that corresponds to the patient and the doctor
    const favourite = await Favourite.findOne({
      patient: decoded.id,
      doctor: doctorId,
    });

    if (!favourite) {
      return res
        .status(404)
        .json({ message: "Doctor not found in favourites" });
    }

    // Remove the favourite from the database
    await Favourite.deleteOne({
      patient: decoded.id,
      doctor: doctorId,
    });

    console.log(`Doctor ${doctorId} removed from favourites`);
    res.status(200).json({ favourite: false });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPatientFavourites,
  addFavouriteDoctor,
  removeFavouriteDoctor,
};
