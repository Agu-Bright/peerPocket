const express = require("express");
const router = express.Router();
const {
  loanRequestController,
  loanAcceptController,
  viewOneLoanController,
  viewManyLoanController,
  viewFilterLoanController,
  payLoanController,
  deleteLoanController,
} = require("../controller/loanController");
const { loanRequestLimiter } = require("../middleware/limiter/limiter");

//middleware
const requestIp = require("request-ip");
const useragent = require("express-useragent");

router.post(
  "/request",
  loanRequestLimiter,
  requestIp.mw(),
  useragent.express(),
  loanRequestController
);

router.post("/accept", loanAcceptController);

router.get("/viewOneLoan", viewOneLoanController);
router.get("/viewManyLoans", viewManyLoanController);
router.get("/viewFilteredLoans", viewFilterLoanController)

router.post("/payLoan", payLoanController)

router.post("/deleteLoan", deleteLoanController)


module.exports = router;
