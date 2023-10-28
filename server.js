import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

//file require
import users from "./routes/users.js";
import { DBConnect } from "./config/db.js";
import errorHandler from "./middleware/error.js";
//config
dotenv.config({ path: "./config/config.env" });

const app = express();

//Connecting With Db
DBConnect();

//middleware
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());

//routes
app.use("/api/v1/users", users);

//Custom Error
app.use(errorHandler);

//Server Code
app.listen(process.env.PORT, () => {
  console.log(`Server Running at PORT ${process.env.PORT}`);
});
