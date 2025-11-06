# 🌐 InfoHub — Full Stack Utility Dashboard

### 🚀 ByteXL Coding Challenge (Full Stack Implementation)

InfoHub is a **Single Page Application (SPA)** built using the **MERN-like stack (React + Express)**.  
It integrates **three everyday utilities** — all in one modern, responsive interface:

1. 🌦 **Weather Information** (Live data using OpenWeatherMap API)  
2. 💱 **Currency Converter** (INR → USD / EUR using ExchangeRate API)  
3. 💬 **Motivational Quote Generator** (Random daily quotes)

This project demonstrates strong understanding of **frontend–backend integration**, **API handling**, **state management**, and **deployment pipelines**.

---

## 🧠 Project Overview

| Feature | Description |
|----------|--------------|
| **Weather** | Fetches real-time weather data for any city. |
| **Currency Converter** | Converts INR → USD / EUR using live exchange rates. |
| **Quotes** | Displays a random motivational quote (fetched from backend). |
| **UI/UX** | Clean, responsive layout built using plain CSS (no frameworks). |

All modules update dynamically without reloading the page — true **SPA behavior**.

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| **Frontend** | React (Vite) | SPA architecture |
| **Backend** | Node.js + Express | REST API server |
| **Styling** | Plain CSS | Responsive, accessible design |
| **HTTP Client** | Axios | Fetching data from APIs |
| **Hosting** | Vercel (frontend) + Render (backend) | Deployment |
| **Version Control** | Git & GitHub | Code management |

---

## 📂 Project Structure

InfoHub-Challenge/
├── client/ # React frontend (Vite)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── WeatherModule.jsx
│ │ │ ├── CurrencyConverter.jsx
│ │ │ └── QuoteGenerator.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ └── package.json
│
├── server/ # Node.js backend (Express)
│ ├── server.js
│ ├── package.json
│ ├── .env.example
│ └── node_modules/
│
├── README.md
└── .gitignore

yaml
Copy code

---

## ⚙️ Installation & Setup

### 🪄 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/infohub-challenge.git
cd infohub-challenge
🧩 2. Backend Setup (server)
bash
Copy code
cd server
npm install
Create a .env file inside /server (copy from .env.example):

bash
Copy code
OPENWEATHER_API_KEY=your_openweather_api_key
EXCHANGE_API_KEY=your_exchange_api_key
PORT=3001
Run the server:

bash
Copy code
npm start
# or
npm run dev
