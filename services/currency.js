const fetch = require("node-fetch");
const baseUrl = "https://api.exchangeratesapi.io";

const getExchangeRate = async (from, to) => {
  const response = await fetch(`${baseUrl}/latest?symbols=${from}&base=${to}`);
  const data = await response.json();
  if (data.error) {
    const { error } = data;
    if (error.match(/^Symbols '(.)*' are invalid for date/g)) {
      throw new Error(`The currency code of the amount is invalid: ${from}`);
    }

    if (error.match(/^Base '(.)*' is not supported/g)) {
      throw new Error(`The currency code to convert is invalid: ${to}`);
    }

    throw new Error(error);
  }
  return data.rates[from];
};

const getAllExchangeRates = async (from) => {
  const response = await fetch(`${baseUrl}/latest?base=${from}`);
  const data = await response.json();
  const items = {};
  for (let key of Object.keys(data.rates)) {
    items[key] = 1 / data.rates[key];
  }
  return items;
};

const convertAmount = async (amount, from, to) => {
  const rate = await getExchangeRate(from, to);
  return rate * amount;
};

module.exports = {
  convertAmount,
  getAllExchangeRates,
};
