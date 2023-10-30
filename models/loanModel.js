const mongoose = require("mongoose");
const { encryptField, decryptField } = require("../utils/encryption");

const Schema = mongoose.Schema;

const loanRequestSchema = new Schema(
  {
    borrowerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    borrowerContext: {
      type: String,
      set: encryptField,
      get: decryptField,
    },
    loanType: {
      type: String,
      required: true,
      enum: ["short-term", "long-term"],
    },
    desiredAmount: {
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    repaymentTime: {
      type: Date,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/, //eg YYYY-MM-DD
    },
    lenderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    lenderAcceptDate: {
      type: Date,
      default: new Date("0000-01-01"),
      match: /^\d{4}-\d{2}-\d{2}$/, //eg YYYY-MM-DD
    },
    interestRate: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Accepted", "Closed"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LoanRequest", loanRequestSchema);
