import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//file require
import users from "./routes/users.js";
import jobs from "./routes/job.js";
import { DBConnect } from "./config/db.js";
import errorHandler from "./middleware/error.js";
//config
dotenv.config({ path: "./config/config.env" });

const app = express();

//Connecting With Db
DBConnect();

//middleware
app.use(cookieParser());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//routes
app.use("/api/v1/users", users);
app.use("/api/v1/jobs", jobs);

//Custom Error
app.use(errorHandler);

//Server Code
app.listen(process.env.PORT, () => {
  console.log(`Server Running at PORT ${process.env.PORT}`);
});
