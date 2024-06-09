const axios = require('axios');

const getExchangeRates = async (baseCurrency) => {
    try {
        const res = await axios.get(`https://open.er-api.com/v6/latest/${baseCurrency}`);
        return res.data;
    } catch (error) {
        throw new Error('Failed to fetch exchange rates');
    }
};

module.exports = { getExchangeRates };