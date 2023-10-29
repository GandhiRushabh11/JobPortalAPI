import express from "express";
import { createJob, deleteJob } from "../controller/job.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/createJob", protect, createJob);
router.delete("/deleteJob/:id", protect, deleteJob);
export default router;
