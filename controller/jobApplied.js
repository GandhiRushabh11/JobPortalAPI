import jobApplied from "../models/jobApplied.js";
import jobModel from "../models/jobModel.js";
import ErrorResponse from "../utils/errorResponse.js";

export const jobApply = async (req, res, next) => {
  const jobID = req.params.jobID;

  if (!req.user._id) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  let job = await jobModel.findById(jobID);

  if (!job) {
    return next(new ErrorResponse(`No job Found with This ID ${jobID}`, 400));
  }

  if (job.status === "Active") {
    let appliedJob = await jobApplied.create({
      user: req.user._id,
      job: job._id,
    });
    res.status(200).json({
      success: true,
      data: appliedJob,
    });
  } else {
    return next(new ErrorResponse(`Not authorized to apply for this Job`, 400));
  }
};

export const getMyAppliedJobs = async (req, res, next) => {
  if (!req.user._id) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  let jobs = await jobApplied.find({ user: req.user._id }).populate("job");

  if (!jobs) {
    return next(new ErrorResponse(`Not Applied to any jobs yet!!`, 400));
  }

  res.status(200).json({
    success: true,
    total: jobs.length,
    data: jobs,
  });
};
