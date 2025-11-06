require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// --- Quote data (simple in-memory array) ---
const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "It is never too late to be what you might have been.", author: "George Eliot"},
  { text: "Don't let your happiness depend on something you may lose.", author: "C.S. Lewis"},
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" }
];

// Utility: random quote
function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

// --- /api/quote ---
app.get('/api/quote', (req, res) => {
  try {
    const q = getRandomQuote();
    res.json({ success: true, quote: q });
  } catch (err) {
    console.error('Quote error', err);
    res.status(500).json({ success: false, error: 'Could not get a quote.' });
  }
});

// --- /api/weather?city=CityName ---
app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || 'London'; // default for testing
    const key = process.env.OPENWEATHER_API_KEY;
    if (!key) return res.status(500).json({ success: false, error: 'OPENWEATHER_API_KEY not set on server.' });

    // OpenWeatherMap current weather API (metric)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`;
    const r = await axios.get(url, { timeout: 5000 });
    const data = r.data;

    // Simplify the response
    const simplified = {
      city: data.name,
      temperatureC: data.main.temp,
      temperatureF: (data.main.temp * 9) / 5 + 32,
      condition: data.weather && data.weather[0] ? data.weather[0].description : 'Unknown',
      icon: data.weather && data.weather[0] ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : null
    };

    res.json({ success: true, weather: simplified });
  } catch (err) {
    console.error('Weather error', err.message || err);
    if (err.response && err.response.data) {
      return res.status(502).json({ success: false, error: 'Upstream weather API error', details: err.response.data });
    }
    res.status(500).json({ success: false, error: 'Could not fetch weather data.' });
  }
});

// --- /api/currency?amount=100 ---
app.get('/api/currency', async (req, res) => {
  try {
    const amount = Number(req.query.amount) || 1;
    const key = process.env.EXCHANGE_API_KEY;
    if (!key) return res.status(500).json({ success: false, error: 'EXCHANGE_API_KEY not set on server.' });

    // Correct: base INR instead of USD
    const url = `https://v6.exchangerate-api.com/v6/${key}/latest/INR`;
    const r = await axios.get(url, { timeout: 5000 });

    const rates = r.data && r.data.conversion_rates ? r.data.conversion_rates : null;
    if (!rates) throw new Error('No conversion_rates returned');

    const usd = amount * rates['USD'];
    const eur = amount * rates['EUR'];

    res.json({
      success: true,
      base: 'INR',
      amount,
      results: {
        usd: Number(usd.toFixed(4)),
        eur: Number(eur.toFixed(4))
      },
      rates
    });
  } catch (err) {
    console.error('Currency error:', err.message || err);
    res.status(500).json({ success: false, error: 'Could not fetch currency rates.' });
  }
});



// Basic root for sanity
app.get('/', (req, res) => res.json({ success: true, msg: 'InfoHub API running' }));

app.listen(PORT, () => console.log(`InfoHub server running on port ${PORT}`));
