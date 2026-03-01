const mongoose = require("mongoose")

const labourJobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
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
  wage: {
    type: Number,
    required: true,
    min: 0
  },
  jobType: {
    type: String,
    enum: ['fulltime', 'parttime'],
    required: true
  },
  seasonal: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
}, { timestamps: true });

// ✅ Add this line to enable geo queries
labourJobSchema.index({ location: "2dsphere" });

const LabourJob = mongoose.model("LabourJob", labourJobSchema);
module.exports = LabourJob;
