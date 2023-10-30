const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const authSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a FirstName to create an account"],
    minlength: 3,
    maxlength: [20, "Your FirstName should not exceed 20 characters"],
  },
  middleName: {
    type: String,
    required: [true, "Please provide a middlename to create an account"],
    minlength: 3,
    maxlength: [20, "Your FirstName should not exceed 20 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a lastname to create an account"],
    minlength: 3,
    maxlength: [20, "Your FirstName should not exceed 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email to create an account"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password to create an account"],
  },
  bvnMobileNumber: {
    type: String,
    required: [
      true,
      "Please provide the phone number tied to your BVN to open an account",
    ],
    // unique: [true, "Please provide a unique phone number to open an account"],
    // maxlength: [11, "Your phone number should not exceed 11 characters"],
  },
  preferredMobileNumber: {
    type: String,
    required: [true, "Please provide a preferred number to open an account"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please provide an date of birth to create an account"],
  },
  gender: {
    type: String,
    required: [true, "Please provide a gender to create an account"],
    enum: ["Male", "Female"],
  },
  bvn: {
    type: Number,
    required: [true, "Please provide a BVN for verification"],
    // unique: true,
  },
  motherMaidenName: {
    type: String,
    required: [
      true,
      "Please provide mother's maiden name to create an account",
    ],
    minlength: 3,
    maxlength: [20, "Your motherMaidenName should not exceed 20 characters"],
  },
  maritalStatus: {
    type: String,
    required: [
      true,
      "Please provide mother's maiden name to create an account",
    ],
    enum: ["Married", "Single"],
  },
  occupation: {
    type: String,
    required: [true, "Please provide an occupation to create an account"],
  },
  employmentStatus: {
    type: String,
    required: [true, "Please select an employment status to create an account"],
  },
  salutation: {
    type: String,
    required: [true, "Please provide a salutation to create an account"],
    enum: ["Mr", "Mrs", "Master", "Miss"],
  },
  address: {
    type: String,
    required: [true, "Please provide an address to create an account"],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name to create an account"],
  },
  state: {
    type: String,
    required: [true, "Please provide a state to create an account"],
  },
  country: {
    type: String,
    required: [true, "Please provide a country to create an account"],
  },
  accountNumber: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 50000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//For hashing passwords before saving user
authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// compare user passwords
authSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", authSchema);
