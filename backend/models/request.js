const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    requesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    ownerId: {
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

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
