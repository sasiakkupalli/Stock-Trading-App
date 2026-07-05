# 📈 SB-Stocks - Stock Trading Application

## Project Overview

SB-Stocks is a full-stack Stock Trading web application developed using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The application enables users to register, log in securely, view available stocks, buy and sell stocks, manage their portfolio, and track transaction history.

---

## Features

- User Registration & Login
- JWT Authentication
- Password Encryption using bcryptjs
- Buy Stocks
- Sell Stocks
- Portfolio Management
- Transaction History
- Responsive User Interface
- MongoDB Atlas Integration

---

## Tech Stack

### Frontend
- React.js
- Vite
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcryptjs

---

## Folder Structure

```
SB-Stocks/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── README.md
└── package.json (if applicable)
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/sasiakkupalli/Stock-Trading-App.git
```

### Navigate to the Project

```bash
cd SB-Stocks
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the **server** folder and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## Running the Application

### Start Backend Server

```bash
cd server
npm run dev
```

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The application will run at:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

---

## Application Modules

- User Registration
- User Login
- Dashboard
- Stock Listing
- Buy Stocks
- Sell Stocks
- Portfolio Management
- Transaction History

---

## Future Enhancements

- Live Stock Market API Integration
- Real-Time Price Updates
- Watchlist Feature
- Stock Charts & Analytics
- Price Alerts & Notifications
- Admin Dashboard
- Mobile Responsive Improvements

---

## Author

**Sasi Akkupalli**

MERN Stack Developer

---

## License

This project is developed for educational and internship purposes.