// index.js
const express = require('express');
const fetch = require('node-fetch'); // used to fetch stock data
const app = express();

const PORT = process.env.PORT || 3000; // Railway will assign a port
const STOCK_SYMBOL = "RBLX"; // Roblox stock symbol

// Route for /stock
app.get('/stock', async (req, res) => {
    try {
        // Fetch stock data from Yahoo Finance
        const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${STOCK_SYMBOL}`);
        const data = await response.json();

        const stock = data.quoteResponse.result[0];

        // Return JSON
        res.json({
            symbol: stock.symbol,
            price: stock.regularMarketPrice,
            change: stock.regularMarketChange,
            percent_change: stock.regularMarketChangePercent,
            high: stock.regularMarketDayHigh,
            low: stock.regularMarketDayLow,
            volume: stock.regularMarketVolume,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch stock data" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
