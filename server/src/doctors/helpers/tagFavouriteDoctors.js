const Favourite = require("../../favourites/favourites.model");

const tagFavouriteDoctors = async (doctors, patientId) => {
  if (!patientId) {
    // If not logged in, just return the doctors without modification
    return doctors.map((doc) => ({
      ...doc.toObject(),
      favourite: false,
    }));
  }

  // Get all favourite doctor IDs for the patient
  const favourites = await Favourite.find({ patient: patientId }).select(
    "doctor"
  );
  const favouriteDoctorIds = favourites.map((f) => f.doctor.toString());

  // Enrich doctor objects
  return doctors.map((doc) => ({
    ...doc.toObject(),
    favourite: favouriteDoctorIds.includes(doc._id.toString()),
  }));
};

module.exports = { tagFavouriteDoctors };
