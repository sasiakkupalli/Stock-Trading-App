import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

import api from "../services/api";
import BuyStock from "../components/BuyStock";
import SellStock from "../components/SellStock";
import ProfitLoss from "../components/ProfitLoss";
import TransactionHistory from "../components/TransactionHistory";

function Dashboard() {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchPortfolio = async () => {
    try {
      const res = await api.get("/trade/portfolio");
      setPortfolio(res.data.portfolio);
    } catch (error) {
      if (error.response?.status === 404) {
        setPortfolio({
          totalInvested: 0,
          stocks: [],
        });
      } else {
        alert(error.response?.data?.message || "Error loading portfolio");
      }
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <h1>📈 Stock Trading Dashboard</h1>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Buy Form */}
      <BuyStock fetchPortfolio={fetchPortfolio} />
      
<div style={{ marginTop: "40px" }}>
  <SellStock fetchPortfolio={fetchPortfolio} />
</div>

    

      {/* Profit/Loss */}
      <ProfitLoss />

      {/* Portfolio */}
      {portfolio ? (
        <div className="table-card">
          
          <h2>📊 My Portfolio</h2>

          <h3>Total Invested: ₹{portfolio.totalInvested}</h3>

          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Quantity</th>
                <th>Average Buy Price</th>
              </tr>
            </thead>

            <tbody>
              {portfolio.stocks.map((stock) => (
                <tr key={stock._id}>
                  <td>{stock.symbol}</td>
                  <td>{stock.quantity}</td>
                  <td>₹{stock.avgBuyPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>Loading Portfolio...</h3>
      )}

      {/* Transactions */}
      <TransactionHistory />
    </div>
  );
}

export default Dashboard;