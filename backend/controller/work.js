const LabourJob = require("../models/work");

async function handelWorkPostRequest(req, res) {
  const body = req.body;

  if (!body || !body.latitude || !body.longitude) {
    return res.status(400).json({ error: "Missing or invalid coordinates." });
  }

  const latitude = parseFloat(body.latitude);
  const longitude = parseFloat(body.longitude);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Invalid coordinates provided." });
  }

  console.log("User in request:", req.user);

  await LabourJob.create({
    title: body.title,
    description: body.description,
    location: {
      type: "Point",
      coordinates: [longitude, latitude] // GeoJSON expects [lng, lat]
    },
    wage: body.wage,
    jobType: body.jobType,
    seasonal: body.seasonal === "yes",
    date: body.date,
    image: req.file ? req.file.filename : null,
    createdBy: req.user._id
  });

  return res.status(201).json({ message: "Job posted successfully!" });
}

module.exports = { handelWorkPostRequest };
