const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 50000,
  },
});

module.exports = mongoose.model("Account", accountSchema);
