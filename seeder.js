import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load env vars
dotenv.config({ path: "./config/config.env" });

import job from "./models/jobModel.js";

//Connect To DB

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

//Read JSON Files

const jobs = JSON.parse(
  fs.readFileSync(`C:/Rushabh/NodePractice/jobPortal/_data/jobs.json`, "utf-8")
);

// Import into DB

const imoprtData = async () => {
  try {
    await job.create(jobs);
    console.log("Data Imported .....");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete Data

const deleteData = async () => {
  try {
    await job.deleteMany();
    console.log("Data Destroyed .....");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  imoprtData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
