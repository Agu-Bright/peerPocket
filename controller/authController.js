const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/authModel");
const sendToken = require("../utils/jwtToken");
const assignAccountNumber = require("../utils/accountNumberUtils");
const Account = require("../models/AccountModel");

const registerUser = catchAsyncErrors(async (req, res, next) => {
  // Set all parameters required for registration to request.body
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    confirmPassword,
    bvnMobileNumber,
    preferredMobileNumber,
    dateOfBirth,
    gender,
    bvn,
    motherMaidenName,
    maritalStatus,
    occupation,
    employmentStatus,
    salutation,
    address,
    city,
    state,
    country,
  } = req.body;

  // Ensure passwords match on registration
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 403));
  }

  // Check if the email is unique
  const checkUserEmail = await User.findOne({ email });
  if (checkUserEmail) {
    return next(new ErrorHandler("Email already exist", 403));
  }

  try {
    // Generate and assign an account number
    const accountNumber = await assignAccountNumber();
    console.log(accountNumber);

    // Create the user using the create method
    const user = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      password,
      bvnMobileNumber,
      preferredMobileNumber,
      dateOfBirth,
      gender,
      bvn,
      motherMaidenName,
      maritalStatus,
      occupation,
      employmentStatus,
      salutation,
      address,
      city,
      state,
      country,
      accountNumber,
    });

    const getUser = await User.findOne({ email });
    const userId = getUser._id;

    await Account.create({
      userId,
      accountNumber,
      balance: 50000, //each user is given 50000 on initial signup
    });

    // Send a token and the user's data in the response
    sendToken(user, 201, res);
  } catch (error) {
    console.error("Error creating the account:", error);
    return next(
      new ErrorHandler(
        "An error occurred while creating the account.",
        error,
        500
      )
    );
  }
});

// Authentication logic for user login
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // simple check to ensure correct email and password are supplied
  if (!email || !password) {
    return next(
      new ErrorHandler("Please enter correct email and password", 400)
    );
  }

  // to find out if the user email already exists on database for login
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("Invalid email!, Please provide a valid email ", 401)
    );
  }

  // A little check to see if password matches
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(
      new ErrorHandler(
        "Invalid password!, Please provide a valid password",
        401
      )
    );
  }

  //Now to send token along logged in  with user since all checks are met
  sendToken(user, 200, res);
});

const getOneUser = catchAsyncErrors(async (req, res, next) => {
  try {
    // set the id to the request paramter
    const { user_id } = req.params;
    // Find one user in the database
    const user = await User.findOne({ _id: user_id });
    //Error handling if user is not found
    if (!user) {
      return next(
        new ErrorHandler("User with id not found on the database", 404)
      );
    }
    //return the user found from database
    res.status(200).json({
      message: "User successfully found",
      user,
    });
  } catch (error) {
    return next(new ErrorHandler("User was not successfully found", 500));
  }
});

const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    //getting the number of users from database
    const userCount = await User.countDocuments();
    // to find all the users in database
    const allUsers = await User.find();
    //A little error handling for use
    if (userCount === 0) {
      return next(new ErrorHandler("No users found in the database", 404));
    }
    res.status(200).json({
      message: "Users successfully found",
      allUsers,
      userCount,
    });
  } catch (error) {
    return next(new ErrorHandler("Users not successfully found", 500));
  }
});

const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "You are successfully logged out!",
  });
});

// GET_LOGGEDIN_USER_PROFILE => api/v1/user/me
const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("no user found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getOneUser,
  logoutUser,
  getUserDetails,
};
