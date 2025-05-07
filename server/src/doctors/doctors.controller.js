const doctors = require("../../doctors");
const Doctor = require("./doctors.model");

const decodToken = require("../../helpers/decodToken");
const { tagFavouriteDoctors } = require("./helpers/tagFavouriteDoctors");

const addAllDoctorsToDb = async (req, res) => {
  try {
    // doctors.map(async (doctor) => {
    //   await Doctor.create(doctor);
    // });
    // for (const doctor of doctors) {
    //   await Doctor.create(doctor); // This will await each insertion sequentially
    // }
    return res.json({ doctor1: doctors[0] });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "internal server error, please relaod the page" });
  }
};

const getAllDoctors = async (req, res) => {
  const token = req.cookies.patientToken;

  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
  const skip = (page - 1) * limit;

  try {
    const decoded = decodToken(token);

    const myDoctors = await Doctor.find()
      .sort({ id: -1 })
      .skip(skip)
      .limit(limit);

    const taggedDoctors = await tagFavouriteDoctors(myDoctors, decoded.id);

    return res.status(200).json({ doctors: taggedDoctors });
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ message: "internal server error, please refresh" });
  }
};

const searchDoctors = async (req, res) => {
  const token = req.cookies.patientToken;
  const decoded = decodToken(token);

  try {
    const searchTxt = req.query.searchTxt;

    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
    const skip = (page - 1) * limit;

    const searchQuery = {
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$first_name", " ", "$last_name"] }, // Combine first_name and last_name
              regex: searchTxt,
              options: "i", // Case insensitive search
            },
          },
        },
        { specialty: { $regex: searchTxt, $options: "i" } },
      ],
    };

    // Fetch the search results
    const doctors = await Doctor.find(searchQuery)
      .sort({ id: -1 })
      .skip(skip) // Skip records for pagination
      .limit(limit); // Limit the number of results per page

    const taggedDoctors = await tagFavouriteDoctors(doctors, decoded.id);

    // Respond with the paginated search results
    res.status(200).json({
      doctors: taggedDoctors,
    });
  } catch (error) {
    console.error("Error searching doctors:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for doctors." });
  }
};

module.exports = {
  addAllDoctorsToDb,
  getAllDoctors,
  searchDoctors,
};
