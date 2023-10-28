const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/authModel");
const Account = require("../models/AccountModel");
const sendToken = require("../utils/jwtToken");
const { generateUniqueAccountNumber } = require("../utils/randomAccountNum");

const registerUser = catchAsyncErrors(async (req, res, next) => {
  //set all parameters required for registration to request.body
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    confirmPassword,
    bvnMobileNumber,
    preferredPhoneNumber,
    dateOfBirth,
    gender,
    bvn,
    motherMaidenName,
    maritalStatus,
    occupation,
    employmentStatus,
    salutation,
    address,
  } = req.body;

  //To make sure passwords match on registration
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 403));
  }
  const checkUserEmail = await User.findOne({ email });
  if (checkUserEmail) {
    return next(new ErrorHandler("The email provided needs to be unique", 403));
  }
  // Convert the dateOfBirth string to a Date object for UTC time format
  const dobDate = new Date(dateOfBirth);
  // create the user itself
  const user = await User.create({
    firstName,
    middleName,
    lastName,
    motherMaidenName,
    dateOfBirth: dobDate,
    gender,
    bvnMobileNumber,
    preferredPhoneNumber,
    email,
    address,
    bvn,
    maritalStatus,
    occupation,
    employmentStatus,
    salutation,
    image,
    password,
    confirmPassword,
  });

  const getUser = await User.findOne({ email });
  const userId = getUser._id;

  const accountNumber = await generateUniqueAccountNumber();
  await Account.create({
    userId,
    accountNumber,
    balance: 50000,
  });

  sendToken(user, 201, res);
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

  //Now to send token along with user since all checks are met
  sendToken(user, 200, res);
});

module.exports = {
  registerUser,
  loginUser,
  // getAllUsers,
  // getOneUser,
};
