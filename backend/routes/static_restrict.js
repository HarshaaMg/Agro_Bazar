const express = require("express");
const router = express.Router();

const { restrictToLoggedinUserOnly } = require("../middleware/auth"); // adjust path as needed
const { fetchAvailableJobs } = require("../middleware/findJobs");
const { fetchAvailableTools } = require("../middleware/findProducts");
const LabourJob = require("../models/work");
const Product = require("../models/product");
const Application = require("../models/application");
const Request = require("../models/request");

// Routes

router.get("/rent-buy", restrictToLoggedinUserOnly, fetchAvailableTools, (req, res) => {
  res.json({ message: "Rent/Buy tools page access granted", tools: req.tools });
});

router.get("/sell", restrictToLoggedinUserOnly, (req, res) => {
  res.json({ message: "Sell tools page access granted", user: req.user });
});

router.get("/post", restrictToLoggedinUserOnly, (req, res) => {
  res.json({ message: "Post labour jobs page access granted", user: req.user });
});

router.get("/find", restrictToLoggedinUserOnly, fetchAvailableJobs, (req, res) => {
  res.json({ message: "Find work page access granted", jobs: req.jobs });
});

router.get("/dashboard", restrictToLoggedinUserOnly, async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Jobs Posted by the User
    const jobsPosted = await LabourJob.find({ createdBy: userId });

    // For each job posted, fetch all applications
    const jobsPostedWithApplicants = await Promise.all(
      jobsPosted.map(async (job) => {
        const applications = await Application.find({ jobId: job._id }).populate("applicantId", "name contact");
        return {
          id: job._id,
          title: job.title,
          location: "Location data", // Simplified for demo
          applicants: applications.map(app => ({
            id: app._id,
            name: app.applicantId.name,
            phone: app.applicantId.contact,
            email: "N/A",
            status: app.status,
            appliedAt: app.createdAt.toISOString().split("T")[0]
          }))
        };
      })
    );

    // 2. Jobs Applied To by the User
    const applicationsMade = await Application.find({ applicantId: userId }).populate("jobId employerId");

    const jobsApplied = applicationsMade.map(app => ({
      id: app.jobId ? app.jobId._id : "N/A",
      title: app.jobId ? app.jobId.title : "Deleted Job",
      employer: app.employerId ? app.employerId.name : "Unknown",
      location: "Location data",
      status: app.status,
      appliedAt: app.createdAt.toISOString().split("T")[0]
    }));

    // 3. Tools Posted by the User
    const toolsPosted = await Product.find({ createdBy: userId });

    // For each tool, fetch requests
    const toolsPostedWithRequesters = await Promise.all(
      toolsPosted.map(async (tool) => {
        const requests = await Request.find({ productId: tool._id }).populate("requesterId", "name contact");
        return {
          id: tool._id,
          name: tool.name,
          price: tool.price,
          type: tool.type,
          requests: requests.map(reqs => ({
            id: reqs._id,
            name: reqs.requesterId.name,
            phone: reqs.requesterId.contact,
            status: reqs.status,
            requestedAt: reqs.createdAt.toISOString().split("T")[0]
          }))
        };
      })
    );

    // 4. Tools Requested by the User
    const requestsMade = await Request.find({ requesterId: userId }).populate("productId ownerId");

    const toolsRequested = requestsMade.map(reqs => ({
      id: reqs.productId ? reqs.productId._id : "N/A",
      name: reqs.productId ? reqs.productId.name : "Deleted Tool",
      owner: reqs.ownerId ? reqs.ownerId.name : "Unknown",
      status: reqs.status,
      requestedAt: reqs.createdAt.toISOString().split("T")[0]
    }));


    res.json({
      message: "Dashboard access granted",
      jobsPosted: jobsPostedWithApplicants,
      jobsApplied: jobsApplied,
      toolsPosted: toolsPostedWithRequesters,
      toolsRequested: toolsRequested
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
});

module.exports = router;
