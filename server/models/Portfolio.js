const mongoose = require("mongoose");

// Each stock inside portfolio
const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  avgBuyPrice: {
    type: Number,
    required: true,
    min: 0
  }
});

// Portfolio schema
const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    stocks: [stockSchema],

    // Optional: total invested amount
    totalInvested: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
