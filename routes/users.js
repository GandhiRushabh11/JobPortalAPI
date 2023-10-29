import express from "express";
import { getMe, login, register, updateDetails } from "../controller/auth.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
//need to change this method after token and middleware
router.put("/updateDetails/", protect, updateDetails);
router.get("/", protect, getMe);
export default router;
