const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const Stock = require("./models/Stock");
const stocks = require("./data/stocks");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Remove existing stocks
    await Stock.deleteMany();

    // Insert sample stocks
    await Stock.insertMany(stocks);

    console.log("✅ Stock data imported successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();