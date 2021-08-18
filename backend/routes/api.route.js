const router = require('express').Router();
const axios = require('axios');
const {jwtCheck} = require('../authz/check-jwt');

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.get('/news',jwtCheck, async (req, res, next) => {
  axios.get(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${process.env.API_KEY}`)
  .then((response) => {
    res.send(response.data);
  })
});

router.get('/crypto_data',jwtCheck, async (req, res, next) => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cbinancecoin%2Ctether%2Czcash%2Cdogecoin%2Clitecoin%2Cethereum-classic%2Cvechain%2Ctron%2Ceos%2Ccosmos%2Cbasic-attention-token%2Cstellar%2Cbitcoin-cash%2Cpolkadot%2Cdash%2Cqtum%2Cuniswap%2Cfilecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
  .then((response) => {
    res.send(response.data);
  })
});

router.get('/crypto_chart/:id',jwtCheck, async (req, res, next) => {
  const id = req.params.id;
  axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`)
  .then((response) => {
    res.send(response.data);
  })
});

router.get('/public', async (req, res, next) => {
  res.send({ message: 'Public 🚀' });
});

module.exports = router;
