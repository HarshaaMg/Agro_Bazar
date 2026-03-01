const express = require("express")
const { handelUserRegistration, handelLogInRequest } = require("../controller/user")
const { handelProductPostRequest } = require("../controller/product")
const { checkAuth, restrictToLoggedinUserOnly } = require("../middleware/auth")
const { handelWorkPostRequest } = require("../controller/work")
const { upload1, upload2 } = require("../controller/image")
const LabourJob = require("../models/work")
const Product = require("../models/product")
const Application = require("../models/application")
const Request = require("../models/request")

const router = express.Router()

router.post("/", handelUserRegistration)
router.post("/login", handelLogInRequest)
router.post("/post/product", checkAuth, upload1.single("image"), handelProductPostRequest)
router.post("/post/work", checkAuth, upload2.single("image"), handelWorkPostRequest)

// Application Route for Jobs
router.post("/apply-job/:jobId", restrictToLoggedinUserOnly, async (req, res) => {
    try {
        const job = await LabourJob.findById(req.params.jobId);
        if (!job) return res.status(404).json({ error: "Job not found" });

        // Ensure applicant is not the employer
        if (job.createdBy.toString() === req.user._id) {
            return res.status(400).json({ error: "You cannot apply to your own job" });
        }

        const existingApplication = await Application.findOne({ jobId: job._id, applicantId: req.user._id });
        if (existingApplication) return res.status(400).json({ error: "You have already applied" });

        await Application.create({
            jobId: job._id,
            applicantId: req.user._id,
            employerId: job.createdBy
        });

        res.status(201).json({ message: "Applied successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error applying to job" });
    }
});

// Request Route for Tools
router.post("/request-tool/:productId", restrictToLoggedinUserOnly, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).json({ error: "Tool not found" });

        // Ensure requester is not the owner
        if (product.createdBy.toString() === req.user._id) {
            return res.status(400).json({ error: "You cannot request your own tool" });
        }

        const existingRequest = await Request.findOne({ productId: product._id, requesterId: req.user._id });
        if (existingRequest) return res.status(400).json({ error: "You have already requested this tool" });

        await Request.create({
            productId: product._id,
            requesterId: req.user._id,
            ownerId: product.createdBy
        });

        res.status(201).json({ message: "Request sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error requesting tool" });
    }
});

// Status Update Route for Applications (Accept/Reject Jobs)
router.post("/application/:appId/status", restrictToLoggedinUserOnly, async (req, res) => {
    try {
        const { status } = req.body;
        if (!["Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const application = await Application.findById(req.params.appId);
        if (!application) return res.status(404).json({ error: "Application not found" });

        // Ensure the person accepting/rejecting is the employer!
        if (application.employerId.toString() !== req.user._id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        application.status = status;
        await application.save();

        res.json({ message: `Application ${status}!`, application });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error updating status" });
    }
});

// Status Update Route for Tool Requests (Accept/Reject Tools)
router.post("/request/:reqId/status", restrictToLoggedinUserOnly, async (req, res) => {
    try {
        const { status } = req.body;
        if (!["Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const toolRequest = await Request.findById(req.params.reqId);
        if (!toolRequest) return res.status(404).json({ error: "Request not found" });

        // Ensure the person accepting/rejecting is the owner!
        if (toolRequest.ownerId.toString() !== req.user._id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        toolRequest.status = status;
        await toolRequest.save();

        res.json({ message: `Request ${status}!`, request: toolRequest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error updating tool status" });
    }
});

module.exports = router