const LabourJob = require("../models/work");
const User = require("../models/user");

async function fetchAvailableJobs(req, res, next) {
  try {
    const currentUserId = req.user._id;
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Missing current location" });
    }

    // Convert to number
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    // Find jobs near the user's location
    const jobs = await LabourJob.find({
      createdBy: { $ne: currentUserId },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude] // GeoJSON format
          },
          $maxDistance: 5000 // meters = 5 km
        }
      }
    }).lean();

    req.jobs = jobs;
    next();
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { fetchAvailableJobs };
