const {rateLimit} = require("express-rate-limit");

const MESSAGE = "Too many requests were created from this IP, please try again after an hour";

const createLimiter = (windowMs, max, message) => {
    return rateLimit({
      windowMs,
      max,
      message: { message: message },
    });
  };

const loanRequestLimiter = createLimiter(10 * 10 * 6000, 30, MESSAGE) //30 requests every hour

module.exports = { loanRequestLimiter };