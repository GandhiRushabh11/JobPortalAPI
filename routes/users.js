import express from "express";
import multer from "multer";
import {
  forgetPassword,
  getMe,
  login,
  register,
  resetPassword,
  updateDetails,
} from "../controller/auth.js";
import { protect } from "../middleware/auth.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/user");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/register", upload.single("ProfilePhoto"), register);
router.post("/login", login);
//need to change this method after token and middleware
router
  .put("/updateDetails", protect, updateDetails)
  .put("/resetPassword/:resettoken", resetPassword);
router.post("/forgetPassword", forgetPassword);
router.get("/", protect, getMe);
export default router;
