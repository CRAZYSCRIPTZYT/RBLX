const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;
const STOCK_SYMBOL = "RBLX";

app.get('/stock', async (req, res) => {
    try {
        const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${STOCK_SYMBOL}`);
        const data = await response.json();
        const stock = data.quoteResponse.result[0];

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
        res.status(500).json({ error: "Failed to fetch stock" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
