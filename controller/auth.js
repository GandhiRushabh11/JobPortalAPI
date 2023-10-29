import userModel from "../models/userModel.js";
import ErrorResponse from "../utils/errorResponse.js";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !password) {
    return next(new ErrorResponse(`Please fill required Fields`, 400));
  }

  const user = await userModel.create({ firstName, lastName, email, password });

  // Sending Token
  sendTokenToResponse(user, 200, res);
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
  // Sending Token
  sendTokenToResponse(user, 200, res);
};

export const updateDetails = async (req, res, next) => {
  const fieldToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  const user = await userModel.findByIdAndUpdate(req.user._id, fieldToUpdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: user,
  });
};

const sendTokenToResponse = (user, statusCode, res) => {
  //Create Token

  const token = user.getSignedJWTToken();

  //Stroing into Cookies

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

export const getMe = async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = req.user;
  res.status(200).json({
    success: true,
    data: user,
  });
};
