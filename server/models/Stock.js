const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    currentPrice: {
      type: Number,
      required: true,
    },

    sector: {
      type: String,
      default: "Technology",
    },

    exchange: {
      type: String,
      default: "NASDAQ",
    },

    marketCap: {
      type: Number,
      default: 0,
    },

    logo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stock", stockSchema);