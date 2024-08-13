import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
} from "../middlewares/verifyToken.js";

import upload from "../config/multer.js";
import {
  uploadAvatar,
  uploadProductImgs,
} from "../controllers/uploadController.js";

const router = express.Router();

router.post("/avatar", verifyToken, upload.single("avatar"), uploadAvatar);

router.post(
  "/product",
  verifyTokenAndAdmin,
  upload.array("photos", 5),
  uploadProductImgs
);

export default router;
