import { useEffect, useState } from "react";
import api from "../services/api";

function ProfitLoss() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProfitLoss();
  }, []);

  const fetchProfitLoss = async () => {
    try {
      const res = await api.post("/trade/profit-loss", {
        currentPrices: {
          AAPL: 190,
          TSLA: 280,
          MSFT: 350,
          GOOG: 180,
        },
      });

      setData(res.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setData({
          totalInvested: 0,
          currentValue: 0,
          profitLoss: 0,
        });
      } else {
        alert(error.response?.data?.message || "Error loading Profit/Loss");
      }
    }
  };

  if (!data) return <h3>Loading Profit/Loss...</h3>;

  return (
    <div className="cards">
      <div className="card">
        <h3>💰 Total Invested</h3>
        <p className="blue">
          ₹{data.totalInvested}
        </p>
      </div>
  
      <div className="card">
        <h3>📈 Current Value</h3>
        <p className="green">
          ₹{data.currentValue}
        </p>
      </div>
  
      <div className="card">
        <h3>💹 Profit / Loss</h3>
  
        <p
          className={
            data.profitLoss >= 0
              ? "green"
              : "red"
          }
        >
          ₹{data.profitLoss}
        </p>
      </div>
    </div>
  );
    
}

export default ProfitLoss;