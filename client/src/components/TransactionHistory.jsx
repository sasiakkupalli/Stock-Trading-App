import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/trade/transactions");
      setTransactions(res.data.transactions);
    } catch (error) {
      alert(error.response?.data?.message || "Error loading transactions");
    }
  };


  if (transactions.length === 0) {
    return (
      <div className="table-card">
        <h2>📜 Transaction History</h2>
        <p>No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="table-card">
      <h2>📜 Transaction History</h2>
  
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
  
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td
                style={{
                  color:
                    transaction.type === "BUY"
                      ? "green"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {transaction.type}
              </td>
  
              <td>{transaction.symbol}</td>
              <td>{transaction.quantity}</td>
              <td>₹{transaction.price}</td>
              <td>₹{transaction.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;