const express = require("express");
const { transferMoneyController } = require("../controller/transferController");
const router = express.Router();

router.post("/money", transferMoneyController);

module.exports = router;
