const Portfolio = require("../models/Portfolio");
const Transaction = require("../models/Transaction");



// BUY STOCK
exports.buyStock = async (req, res) => {
  try {
    
    const { symbol, quantity, price } = req.body;
    const userId = req.user.id;

    const totalAmount = quantity * price;

    // 1. Create Transaction
    const transaction = await Transaction.create({
      userId,
      symbol,
      type: "BUY",
      quantity,
      price,
      totalAmount
    });

    // 2. Find or create portfolio
    let portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      portfolio = new Portfolio({
        userId,
        stocks: [],
        totalInvested: 0
      });
    }

    // 3. Check if stock already exists
    const stockIndex = portfolio.stocks.findIndex(
      (s) => s.symbol === symbol
    );

    if (stockIndex > -1) {
      // 📈 Existing stock → update quantity + avg price

      const existingStock = portfolio.stocks[stockIndex];

      const newQuantity = existingStock.quantity + quantity;

      const newAvgPrice =
        (existingStock.avgBuyPrice * existingStock.quantity +
          price * quantity) /
        newQuantity;

      portfolio.stocks[stockIndex].quantity = newQuantity;
      portfolio.stocks[stockIndex].avgBuyPrice = newAvgPrice;
    } else {
      // 🆕 New stock
      portfolio.stocks.push({
        symbol,
        quantity,
        avgBuyPrice: price
      });
    }

    // 4. Update total invested
    portfolio.totalInvested += totalAmount;

    // 5. Save portfolio
    await portfolio.save();

    res.status(200).json({
      success: true,
      message: "Stock bought successfully",
      transaction,
      portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// SELL STOCK
exports.sellStock = async (req, res) => {
  try {
    
    const userId = req.user.id;
    const { symbol, quantity, price } = req.body;

    const totalAmount = quantity * price;

    // 1. Find portfolio
    const portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found"
      });
    }

    // 2. Find stock
    const stockIndex = portfolio.stocks.findIndex(
      (s) => s.symbol === symbol
    );

    if (stockIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Stock not found in portfolio"
      });
    }

    const existingStock = portfolio.stocks[stockIndex];

    // 3. Check quantity
    if (existingStock.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock to sell"
      });
    }

    // 4. Reduce quantity
    existingStock.quantity -= quantity;

    // 5. Remove stock if quantity becomes 0
    if (existingStock.quantity === 0) {
      portfolio.stocks.splice(stockIndex, 1);
    } else {
      portfolio.stocks[stockIndex] = existingStock;
    }

    // 6. Update invested amount (simple logic)
    portfolio.totalInvested -= totalAmount;

    if (portfolio.totalInvested < 0) {
      portfolio.totalInvested = 0;
    }

    await portfolio.save();

    // 7. Create SELL transaction
    const transaction = await Transaction.create({
      userId,
      symbol,
      type: "SELL",
      quantity,
      price,
      totalAmount
    });

    res.status(200).json({
      success: true,
      message: "Stock sold successfully",
      transaction,
      portfolio
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET PORTFOLIO
exports.getPortfolio = async (req, res) => {
    try {
      
      const userId = req.user.id;
  
      const portfolio = await Portfolio.findOne({ userId });
  
      if (!portfolio) {
        return res.status(404).json({
          success: false,
          message: "Portfolio not found"
        });
      }
  
      res.status(200).json({
        success: true,
        portfolio
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  // GET TRANSACTIONS
exports.getTransactions = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const transactions = await Transaction.find({ userId })
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        transactions
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };


  // GET PROFIT / LOSS
exports.getProfitLoss = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const { currentPrices } = req.body;
  
      const portfolio = await Portfolio.findOne({ userId });
  
      if (!portfolio) {
        return res.status(404).json({
          success: false,
          message: "Portfolio not found"
        });
      }
  
      let currentValue = 0;
  
      portfolio.stocks.forEach((stock) => {
        const currentPrice = currentPrices[stock.symbol];
  
        if (currentPrice) {
          currentValue += stock.quantity * currentPrice;
        } else {
          currentValue += stock.quantity * stock.avgBuyPrice;
        }
      });
  
      const totalInvested = portfolio.totalInvested;
      const profitLoss = currentValue - totalInvested;
  
      res.status(200).json({
        success: true,
        totalInvested,
        currentValue,
        profitLoss
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };