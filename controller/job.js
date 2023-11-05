import jobModel from "../models/jobModel.js";
import ErrorResponse from "../utils/errorResponse.js";
export const createJob = async (req, res, next) => {
  const {
    title,
    description,
    keySkills,
    offerSalary,
    company,
    workType,
    experienceLevel,
  } = req.body;

  if (!req.user._id) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  if (!title || !company) {
    return next(new ErrorResponse(`Please fill required Fields`, 400));
  }
  const job = await jobModel.create({
    title,
    description,
    keySkills,
    offerSalary,
    company,
    workType,
    experienceLevel,
    createdBy: req.user._id,
  });

  res.status(200).json({
    success: true,
    data: job,
  });
};

export const updateJob = async (req, res, next) => {
  const {
    title,
    description,
    status,
    workType,
    keySkills,
    offerSalary,
    experienceLevel,
    company,
  } = req.body;

  if (!req.user._id) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  if (!title || !company) {
    return next(new ErrorResponse(`Please fill required Fields`, 400));
  }
  const fieldToUpdate = {
    title,
    description,
    status,
    workType,
    keySkills,
    offerSalary,
    experienceLevel,
    company,
  };
  let job = await jobModel.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorResponse(`No job Found with This ID ${req.params.id}`, 400)
    );
  }
  if (!(job.createdBy._id.toString() === req.user._id.toString())) {
    return next(new ErrorResponse(`Not authorized to Update this Job`, 400));
  }

  job = await job.updateOne(fieldToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: job,
  });
};
export const deleteJob = async (req, res, next) => {
  if (!req.user._id) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  const job = await jobModel.findById(req.params.id).populate("createdBy");

  if (!job) {
    return next(
      new ErrorResponse(`No job Found with This ID ${req.params.id}`, 400)
    );
  }
  const status = job.createdBy._id.toString() === req.user._id.toString();
  if (!status) {
    return next(new ErrorResponse(`Not authorized to delete this Jobs`, 400));
  }

  await job.deleteOne();

  res
    .status(200)
    .json({ success: true, message: "Job deleted Successfully!!!" });
};

export const getJob = async (req, res, next) => {
  if (!req.user._id) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  const job = await jobModel.find({ createdBy: req.user._id });

  if (!job) {
    return next(new ErrorResponse(`No job Created By You !`, 400));
  }

  res.status(200).json({ success: true, total: job.length, data: job });
};

export const getJobs = async (req, res, next) => {
  const job = await jobModel.find();

  if (!job) {
    return next(new ErrorResponse(`No jobs Found!`, 400));
  }

  res.status(200).json(res.advancedResults);
};
