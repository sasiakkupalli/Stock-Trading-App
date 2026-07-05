const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");


  const {
    buyStock,
    sellStock,
    getPortfolio,
    getTransactions,
    getProfitLoss
  } = require("../controllers/tradeController");

// Buy Stock
//router.post("/buy", buyStock);
router.post("/buy", auth, buyStock);

// Sell Stock
//router.post("/sell", sellStock);
router.post("/sell", auth, sellStock);

// Get Portfolio
//router.get("/portfolio/:userId", getPortfolio);
//router.get("/portfolio/:userId", auth, getPortfolio);
router.get("/portfolio", auth, getPortfolio);

//get transaction
//router.get("/transactions/:userId", getTransactions);
router.get("/transactions", auth, getTransactions);

router.post("/profit-loss", auth, getProfitLoss);


module.exports = router;