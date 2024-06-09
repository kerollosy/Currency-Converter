const express = require('express');
const { getExchangeRates } = require("./currency");
const NodeCache = require("node-cache");
const rateLimit = require("express-rate-limit");
require('dotenv').config();

const app = express();
const CACHE_TTL = process.env.CACHE_TTL || 1 * 60 * 60 // Cache for 1 hour
const cache = new NodeCache({ stdTTL: CACHE_TTL });

// Limit the user to 50 requests every 5 minutes
const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 5 * 60 * 1000,
    limit: process.env.RATE_LIMIT_MAX || 50
});

// Apply the rate limiter only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.use(limiter);
}

app.get('/api/rates', async (req, res) => {
    let { from, to } = req.query;

    // Validate query parameters
    if (!from) {
        return res.status(400).json({ error: 'Base currency is required' });
    }
    if (!to) {
        return res.status(400).json({ error: 'Target currency is required' });
    }

    // Convert currencies to uppercase so we can store/retrieve them from cache
    from = from.toUpperCase();
    to = to.toUpperCase();

    try {
        // Check if the rates for the base currency are already in the cache
        if (cache.has(from)) {
            const rates = cache.get(from);
            const rate = rates[to];

            // Check if target currency exists in the cached rates
            if (!rate) {
                return res.status(404).json({ error: 'Target currency not found' });
            }
            return res.json({ result: "success", cached: true, rate: rate });
        }

        try {
            const data = await getExchangeRates(from);

            // Check if base currency exists
            if (!data.rates) {
                return res.status(404).json({ error: 'Base currency not found' });
            }

            const rate = data.rates[to];

            // Check if target currency exists
            if (!rate) {
                return res.status(404).json({ error: 'Target currency not found' });
            }

            // Store all the rates in the cache
            cache.set(from, data.rates);
            res.json({ result: "success", rate });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = app;