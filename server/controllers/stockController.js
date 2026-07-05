const Stock = require("../models/Stock");

// Get all stocks
const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();

    res.json(stocks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get stock by symbol
const getStockBySymbol = async (req, res) => {
  try {
    const stock = await Stock.findOne({
      symbol: req.params.symbol.toUpperCase(),
    });

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    res.json(stock);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStocks,
  getStockBySymbol,
};