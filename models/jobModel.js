import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlegnth: 100,
      required: [true, "Please Provide job Title"],
      trim: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Pending",
    },
    workType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
      default: "Full-Time",
    },
    keySkills: {
      type: Array,
    },
    offerSalary: {
      type: String,
    },
    experienceLevel: {
      type: String,
      required: [true, "Please add a Experience Level"],
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    company: {
      type: String,
      maxlegnth: 100,
      required: [true, "Please Provide Company Name"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("job", jobSchema);

export default jobModel;
