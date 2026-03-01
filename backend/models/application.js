const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LabourJob",
        required: true
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
