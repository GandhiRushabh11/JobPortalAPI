import express from "express";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} from "../controller/job.js";
import { authorize, protect } from "../middleware/auth.js";
import { getMyAppliedJobs, jobApply } from "../controller/jobApplied.js";
import jobModel from "../models/jobModel.js";
import advancedResults from "../middleware/advancedResults.js";
const router = express.Router();

router.post("/createJob", protect, authorize("admin", "publisher"), createJob);
router.post(
  "/applyJob/:jobID",
  protect,
  authorize("user", "admin", "publisher"),
  jobApply
);
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
router.get("/getJob", protect, authorize("admin", "publisher"), getJob);
router.get("/myAppliedJob", protect, authorize("user"), getMyAppliedJobs);
router.get("/", advancedResults(jobModel, "createdBy"), getJobs);
export default router;
