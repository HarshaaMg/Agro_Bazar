const express = require("express")
const {restrictToLoggedinUserOnly, checkAuth} = require("../middleware/auth")
const router = express.Router()

router.get("/", (req, res)=>{
    res.json({ message: "API working" });

})

router.get("/register", (req,res)=>{
    res.json({ message: "Register page API endpoint (React handles UI)" });
});

router.get("/login", (req,res)=>{
    res.json({ message: "Login page API endpoint (React handles UI)" });
});


module.exports = router