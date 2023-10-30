import express from "express";
import { createJob, deleteJob, getJobs, updateJob } from "../controller/job.js";
import { authorize, protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/createJob", protect, authorize("admin", "publisher"), createJob);
router.put(
  "/updateJob/:id",
  protect,
  authorize("admin", "publisher"),
  updateJob
);
router.delete(
  "/deleteJob/:id",
  protect,
  authorize("admin", "publisher"),
  deleteJob
);
router.get("/", protect, authorize("admin", "publisher"), getJobs);
export default router;
