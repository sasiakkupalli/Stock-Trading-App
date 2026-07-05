import { useState } from "react";
import api from "../services/api";

function BuyStock({ fetchPortfolio }) {
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

  const handleBuy = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/trade/buy", formData);

      alert(res.data.message);

      setFormData({
        symbol: "",
        quantity: "",
        price: "",
      });

      fetchPortfolio();
    } catch (error) {
      alert(error.response?.data?.message || "Buy Failed");
    }
  };

  return (
    
    <div className="form-card">
      
      <h2>🟢 Buy Stock</h2>

      <form onSubmit={handleBuy}>
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
  className="buy-btn"
>
  Buy Stock
</button>

   
      </form>
    </div>
  );
}

export default BuyStock;