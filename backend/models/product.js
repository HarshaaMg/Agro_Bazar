const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },

  type: { 
    type: String,
    enum: ['rent', 'buy'] 
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String
  },

  image: {
    type: String
  },

  available: {
    type: Boolean
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    }
  },
  
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
}, {timestamps: true})

const Product = mongoose.model("product", productSchema)
module.exports = Product