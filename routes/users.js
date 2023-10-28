import express from "express";
import { login, register, updateDetails } from "../controller/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
//need to change this method after token and middleware
router.put("/updateDetails/:id", updateDetails);

export default router;
