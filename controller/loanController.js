const loanRequestInfo = require("../logger/loanRequestInfo");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

//CONSTANT ERROR MESSAGE
const DEFAULT_ERROR_MESSAGE = "Internal server error. Please try again later.";
const LOAN_NOT_FOUND_MESSAGE = "Loan request not found.";
const INVALID_DATE_MESSAGE = "Invalid repaymentTime format. Use YYYY-MM-DD.";

//model
const LoanRequest = require("../models/loanModel");
const AccountDetail = require("../models/AccountModel");

/**
 * @route PATCH /peerloan/request/
 */
const loanRequestController = catchAsyncErrors(async (req, res, next) => {
  //later decode toke to get userID
  const { borrowerId } = req.body;
  const borrowerContext = await loanRequestInfo(
    req,
    "User requesing a loan",
    "loan request"
  );
  const { loanType, desiredAmount, purpose, repaymentTime, interestRate } =
    req.body;

  // Validate the repaymentTime format (YYYY-MM-DD)
  const repaymentTimeRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!repaymentTime.match(repaymentTimeRegex)) {
    // return res.status(400).json({ error: INVALID_DATE_MESSAGE });
    return next(new ErrorHandler(INVALID_DATE_MESSAGE, 403));
  }

  const newLoan = new LoanRequest({
    borrowerId,
    borrowerContext,
    loanType,
    desiredAmount,
    purpose,
    repaymentTime,
    interestRate,
  });
  try {
    const savedLoan = await newLoan.save();
    if (savedLoan) {
      res.status(200).json({ message: "Loan Request created successfully." });
    } else {
      // res.status(400).json({ message: "Loan Request creation failed." });
      return next(new ErrorHandler("Loan Request creation failed.", 403));
    }
  } catch (error) {
    // res.status(500).json({ message: DEFAULT_ERROR_MESSAGE });
    return next(new ErrorHandler(DEFAULT_ERROR_MESSAGE, 500));
  }
});

/**
 * @route PATCH /peerloan/accept/
 */
const loanAcceptController = catchAsyncErrors(async (req, res, next) => {
  const { loanRequestId, borrowerId, lenderId, decision, amount } = req.body;
  // Decision can be "accepted" or "rejected"

  if (borrowerId == lenderId) {
    // return res.status(400).json({ message: "You can't borrow from yourself." });
    return next(new ErrorHandler("You can't borrow from yourself.", 403));
  }

  if (decision.toLowerCase() !== "accepted") {
    // return res.status(400).json({ message: "Loan not accepted." });
    return next(new ErrorHandler("Loan not accepted", 403));
  }
  try {
    const loanRequest = await LoanRequest.findById(loanRequestId);
    if (loanRequest.desiredAmount != Number(amount)) {
      // return res.status(400).json({ message: "Amount is not equal" });
      return next(new ErrorHandler("Amounts are not equal", 403));
    }

    if (!loanRequest) {
      // return res.status(400).json({ message: LOAN_NOT_FOUND_MESSAGE });
      return next(new ErrorHandler(LOAN_NOT_FOUND_MESSAGE, 403));
    }

    if (loanRequest.status != "Pending") {
      // return res.status(400).json({ message: "Loan is unavaliable." });
      return next(new ErrorHandler("Loan is unavaliable", 403));
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    //debit money from lender and credit the borrower
    // const accountDetail = await AccountDetail.findOne({"userId": })
    const lenderAccountDetail = await AccountDetail.findOne({
      userId: lenderId,
    });
    if (Number(amount) > lenderAccountDetail.balance) {
      // return res.status(400).json({ message: "Unsufficient account balance" });
      return next(new ErrorHandler("Insufficient account balance", 403));
    }
    lenderAccountDetail.balance -= Number(amount);
    lenderAccountDetail.save();
    const borrowerAccountDetail = await AccountDetail.findOne({
      userId: borrowerId,
    });
    borrowerAccountDetail.balance += Number(amount);
    borrowerAccountDetail.save();

    loanRequest.lenderId = lenderId;
    loanRequest.lenderAcceptDate = formattedDate;
    loanRequest.status = "Accepted";
    await loanRequest.save();
    res.status(200).json({ message: "Loan accepted." });
  } catch (error) {
    return next(new ErrorHandler(DEFAULT_ERROR_MESSAGE, 500));
  }
});

/**
 * @route PATCH /peerloan/viewOneLoan/
 */
const viewOneLoanController = catchAsyncErrors(async (req, res, next) => {
  const { loanRequestId } = req.body;
  try {
    const loanRequest = await LoanRequest.findById(loanRequestId).populate(
      "borrowerId",
      "firstName lastName email preferredPhoneNumber dateOfBirth gender employmentStatus occupation salutation"
    );
    if (!loanRequest) {
      // return res.status(400).json({ message: LOAN_NOT_FOUND_MESSAGE });
      return next(new ErrorHandler(LOAN_NOT_FOUND_MESSAGE, 403));
    }

    const {
      borrowerId,
      loanType,
      desiredAmount,
      purpose,
      repaymentTime,
      interestRate,
      status,
    } = loanRequest;

    res.status(200).json({
      firstName,
      lastName,
      email,
      BVNPhoneNUmber,
      borrowerId,
      loanType,
      desiredAmount,
      purpose,
      repaymentTime,
      interestRate,
      status,
    });
  } catch (error) {
    return next(new ErrorHandler(DEFAULT_ERROR_MESSAGE, 500));
  }
});

/**
 * @route PATCH /peerloan/viewManyLoans/
 */
const viewManyLoanController = catchAsyncErrors(async (req, res, next) => {
  let { loanNumber } = req.body;

  let manyLoanRequests = [];
  try {
    const loanRequests = await LoanRequest.find();
    loanRequests.sort((a, b) => b.timeStamp - a.timeStamp);

    if (!isNaN(loanNumber)) {
      const numToCopy = Math.min(loanNumber, loanRequests.length);

      for (let i = 0; i < numToCopy; i++) {
        manyLoanRequests[i] = loanRequests[i];
      }
      res.status(200).json({ message: manyLoanRequests });
    } else {
      // res.status(400).json({ message: "Invalid loanNumber" });
      return next(new ErrorHandler("Invalid loan number", 403));
    }
  } catch (error) {
    return next(new ErrorHandler(DEFAULT_ERROR_MESSAGE, 500));
  }
});

/**
 * @route PATCH /peerloan/viewFilteredLoans/
 */
const viewFilterLoanController = catchAsyncErrors(async (req, res, next) => {
  const { maxPrice, loanNumber } = req.body;

  if (isNaN(maxPrice)) {
    // return res.status(400).json({ message: "Invalid maxPrice" });
    return next(new ErrorHandler("Invalid max price", 403));
  }
  if (isNaN(loanNumber)) {
    // return res.status(400).json({ message: "Invalid loanNumber" });
    return next(new ErrorHandler("Invalid loan number", 403));
  }

  let filteredLoanRequests = [];
  try {
    const loanRequests = await LoanRequest.find();
    loanRequests.sort((a, b) => b.timeStamp - a.timeStamp);

    const numToCopy = Math.min(loanNumber, loanRequests.length);

    for (let i = 0; i < numToCopy; i++) {
      if (maxPrice >= loanRequests[i].desiredAmount) {
        filteredLoanRequests.push(loanRequests[i]);
      }
      if (filteredLoanRequests.length >= loanNumber) {
        break;
      }
    }
    res.status(200).json({ message: filteredLoanRequests });
  } catch (error) {
    return next(new ErrorHandler(DEFAULT_ERROR_MESSAGE, 500));
  }
});

/**
 * @route PATCH /peerloan/payLoan/
 */
const payLoanController = catchAsyncErrors(async (req, res, next) => {
  const { loanRequestId, borrowerId, lenderId, amount } = req.body;
  try {
    const loanRequest = await LoanRequest.findById(loanRequestId);
    if (loanRequest.desiredAmount != Number(amount)) {
      // return res.status(400).json({ message: "Pay amount borrowed." });
      return next(new ErrorHandler("Pay amount borrowed.", 403));
    }
    const borrowerAccountDetail = await AccountDetail.findOne({
      userId: borrowerId,
    });

    if (Number(amount) > borrowerAccountDetail.balance) {
      // return res.status(400).json({ message: "Unsufficient account balance" });
      return next(new ErrorHandler("Insufficient account balance", 403));
    }
    borrowerAccountDetail.balance -= Number(amount);
    await borrowerAccountDetail.save();
    const lenderAccountDetail = await AccountDetail.findOne({
      userId: lenderId,
    });
    lenderAccountDetail.balance += Number(amount);
    await lenderAccountDetail.save();

    loanRequest.status = "Closed";
    await loanRequest.save();

    res.status(200).json({ message: "Loan paid successfully." });
  } catch (error) {
    return next(new ErrorHandler(DEFAULT_ERROR_MESSAGE, 500));
  }
});

const deleteLoanController = catchAsyncErrors(async (req, res, next) => {
  const { loanRequestId, borrowerId } = req.body;
  try {
    const loanRequest = await LoanRequest.findById(loanRequestId);
    if (loanRequest.borrowerId != borrowerId) {
      return next(new ErrorHandler("You did not request this loan", 400));
    }
    if (loanRequest.status != "Pending") {
      return next(
        new ErrorHandler("You can not delete accepted or closed loan request", 400)
      );
    }
    loanRequest.status = "Closed";
    await loanRequest.save();
    res.status(200).json({message: "Loan closed successfully."})
  } catch (error) {
    return next(new ErrorHandler(DEFAULT_ERROR_MESSAGE, 500));
  }
});

module.exports = {
  loanRequestController,
  loanAcceptController,
  viewOneLoanController,
  viewManyLoanController,
  viewFilterLoanController,
  payLoanController,
  deleteLoanController
};