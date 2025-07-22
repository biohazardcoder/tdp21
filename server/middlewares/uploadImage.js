
import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads/images");
  },
  filename: (_, file, cb) => {
    const hash = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(file.originalname);
    cb(null, `${hash}${ext}`);
  },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_, file, cb) => {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed!"), false);
      }
      cb(null, true);
    },
  });
  
  export default function (req, res, next) {
    upload.array("images", 5)(req, res, (err) => { 
      if (err) {
        return res.status(400).json({ message: err.message });
      }
  
      if (req.files) {
        req.uploadedImages = req.files.map(
          (file) => `https://tdp21.mukammal-crm.uz/uploads/images/${file.filename}`
        );
      }
  
      next();
    });
  }
  
