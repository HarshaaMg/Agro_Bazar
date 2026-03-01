const Product = require("../models/product")


async function handelProductPostRequest(req, res) {
  const body = req.body;
  if (!body) {
    return res.status(404).json({ Error: "URL is required" });
  }

  const latitude = parseFloat(body.latitude);
  const longitude = parseFloat(body.longitude);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ Error: "Invalid latitude or longitude" });
  }

  console.log("User in request:", req.user);

  await Product.create({
    type: body.type,
    createdBy: req.user._id, // Coming from middleware
    name: body.name,
    price: body.price,
    description: body.description,
    image: req.file.path,
    available: body.available === "on",
    location: {
      type: "Point",
      coordinates: [longitude, latitude], // GeoJSON [lng, lat]
    },
  });

  return res.redirect("/sell");
}


module.exports = {handelProductPostRequest}