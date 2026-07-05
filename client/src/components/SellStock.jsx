import { useState } from "react";
import api from "../services/api";

function SellStock({ fetchPortfolio }) {
  const [formData, setFormData] = useState({
    symbol: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSell = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/trade/sell", formData);

      alert(res.data.message);

      setFormData({
        symbol: "",
        quantity: "",
        price: "",
      });

      fetchPortfolio();
    } catch (error) {
      alert(error.response?.data?.message || "Sell Failed");
    }
  };

  return (
    <div className="form-card">
     
      <h2>🔴 Sell Stock</h2>

      <form onSubmit={handleSell}>
        <input
          type="text"
          name="symbol"
          placeholder="Stock Symbol"
          value={formData.symbol}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="sell-btn"
        >
          Sell Stock
        </button>
      </form>
    </div>
  );
}

export default SellStock;