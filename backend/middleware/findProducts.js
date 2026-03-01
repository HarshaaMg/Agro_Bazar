const Product = require("../models/product");

async function fetchAvailableTools(req, res, next) {
  try {
    const currentUserId = req.user._id;

    const tools = await Product.find({
      createdBy: { $ne: currentUserId }
    }).lean(); // lean() returns plain JS objects (faster for rendering)

    req.tools = tools; // Attach to req for next middleware
    next();
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).send("Internal Server Error");
  }
}


module.exports = {fetchAvailableTools}