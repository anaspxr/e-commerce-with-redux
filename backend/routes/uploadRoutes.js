import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  verifyToken,
  verifyTokenAndAdmin,
} from "../middlewares/verifyToken.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join("../uploads", req.url);

    // Check if the directory exists, if not, create it
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/avatar", verifyToken, upload.single("avatar"), (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json("No file uploaded");
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post(
  "/product",
  verifyTokenAndAdmin,
  upload.array("photos", 5),
  (req, res) => {
    try {
      const files = req.files;
      if (!files || files.length === 0)
        return res.status(400).json("No files uploaded");
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default router;
