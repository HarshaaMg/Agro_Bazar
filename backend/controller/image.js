const multer = require("multer")
const path = require("path")

const storage1 = multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, "./public/uploads/product")
    },
    filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_"); // remove spaces
    const userId = req.user ? req.user._id.toString() : "unknownUser";
    const timestamp = Date.now();
    const newFileName = `${userId}_${baseName}_${timestamp}${ext}`;
    cb(null, newFileName);
  }
})

const upload1 = multer({storage: storage1})

const storage2 = multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, "./public/uploads/jobs")
    },
    filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_"); // remove spaces
    const userId = req.user ? req.user._id.toString() : "unknownUser";
    const timestamp = Date.now();
    const newFileName = `${userId}_${baseName}_${timestamp}${ext}`;
    cb(null, newFileName);
  }
})

const upload2 = multer({storage: storage2})

module.exports = {upload1, upload2}