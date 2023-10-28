import userModel from "../models/userModel.js";
import ErrorResponse from "../utils/errorResponse.js";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !password) {
    return next(new ErrorResponse(`Please fill required Fields`, 400));
  }

  const user = await userModel.create({ firstName, lastName, email, password });
  //Sending User Data
  res.status(200).json({
    success: true,
    data: user,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400));
  }
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //Matching Password

  const isMatch = await user.isPasswordMatched(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // Send Token

  res.status(200).json({
    success: true,
    data: user.email,
  });
};

export const updateDetails = async (req, res, next) => {
  const fieldToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  const user = await userModel.findByIdAndUpdate(req.params.id, fieldToUpdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: user,
  });
};
