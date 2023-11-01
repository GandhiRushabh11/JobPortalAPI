import mongoose from "mongoose";

const jobAppliedSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Pending", "Rejected", "Interview", "Selected"],
      default: "Pending",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    job: {
      type: mongoose.Schema.ObjectId,
      ref: "job",
    },
  },
  { timestamps: true }
);

const jobApplied = mongoose.model("jobApplied", jobAppliedSchema);

export default jobApplied;
