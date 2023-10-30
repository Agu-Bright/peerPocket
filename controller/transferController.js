const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

const AccountDet = require("../models/AccountModel");

//CONSTANT ERROR MESSAGE
const DEFAULT_ERROR_MESSAGE = "Internal server error. Please try again later.";

const transferMoneyController = catchAsyncErrors(async (req, res, next) => {
  const { senderNumber, receiverNumber, amount } = req.body;

  try {
    if (amount <= 0) {
      return next(new ErrorHandler("Amount must be greater than zero", 400));
    }
    if (senderNumber === receiverNumber) {
      return next(new ErrorHandler("You can not transfer to yourself", 400));
    }

    const senderAccount = await AccountDet.findOne({
      accountNumber: senderNumber,
    });
    const receiverAccount = await AccountDet.findOne({
      accountNumber: receiverNumber,
    });

    if (!senderAccount || !receiverAccount) {
      return next(
        new ErrorHandler("Sender or receiver account not found", 404)
      );
    }

    if (senderAccount.balance < amount) {
      return next(
        new ErrorHandler("Insufficient balance in the sender's account", 400)
      );
    }

    senderAccount.balance -= amount;
    await senderAccount.save();

    receiverAccount.balance += Number(amount);
    await receiverAccount.save();
    res.status(200).json({ message: "Money transferred successfully" });
  } catch (error) {
    return next(new ErrorHandler(DEFAULT_ERROR_MESSAGE, 500));
  }
});

module.exports = {
  transferMoneyController,
};
