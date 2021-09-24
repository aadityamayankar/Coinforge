const router = require('express').Router();
const axios = require('axios');
const { jwtCheck } = require('../authz/check-jwt');
const {
  getUuid,
  formatAsset,
  updateAsset,
  getHoldings,
  sellAsset,
  getPorfolioChart,
} = require('../logic/assist');
const User = require('../models/userModel');
const Portfolio = require('../models/portfolioModel');

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

// USER REQUESTS

router.post('/signup', jwtCheck, (req, res, next) => {
  const user = new User({
    nickname: req.body.nickname,
    name: req.body.name,
    picture: req.body.picture,
    updated_at: req.body.updated_at,
    email: req.body.email,
    email_verified: req.body.email_verified,
    sub: req.body.sub,
  });

  const portfolio = new Portfolio({
    email: req.body.email,
    sub: req.body.sub,
  });

  const usd = {
    name: 'US Dollar',
    id: 'usd',
    price: 1,
    buy_price: 1,
    quantity: 50000,
    holdings: 50000,
    fraction: 100,
    price_change: 0,
    profit: 0,
    profit_precentage: 0,
  };

  user
    .save()
    .then((result) => {
      portfolio
        .save()
        .then((result) => {
          Portfolio.findOneAndUpdate(
            { sub: req.body.sub },
            { $push: { assets: usd } }
          )
            .then((result) => {
              console.log('done');
              res.send(result);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
      res.send(e.message);
    });
});

router.post('/getUser', jwtCheck, (req, res, next) => {
  User.find({ sub: req.body.sub })
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post('/setPremium', jwtCheck, (req, res, next) => {
  User.findOneAndUpdate({ sub: req.body.sub }, { premium: req.body.premium })
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post('/portfolio', (req, res, next) => {
  Portfolio.findOne({ sub: req.body.sub })
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post('/buyCoin', (req, res, next) => {
  let currentHoldings = getHoldings(req.body.assets);
  let asset = formatAsset(req.body.asset, req.body.amount, currentHoldings);
  Portfolio.findOne({
    sub: req.body.sub,
    assets: { $elemMatch: { id: asset.id } },
  })
    .then((result) => {
      if (result != null) {
        Portfolio.findOneAndUpdate(
          { sub: req.body.sub },
          { $pull: { assets: { id: asset.id } } }
        )
          .then(() => {
            let resAsset = result.assets.filter((_asset) => {
              return _asset.id === asset.id;
            });
            asset = updateAsset(
              req.body.asset,
              req.body.amount,
              resAsset[0],
              currentHoldings
            );
            Portfolio.findOneAndUpdate(
              { sub: req.body.sub },
              {
                $push: { assets: asset },
                currBal: req.body.currBal - req.body.amount,
                holdings: currentHoldings,
              }
            )
              .then(() => {
                Portfolio.findOneAndUpdate(
                  { sub: req.body.sub, assets: { $elemMatch: { id: 'usd' } } },
                  {
                    $set: {
                      'assets.$.quantity': req.body.currBal - req.body.amount,
                      'assets.$.holdings': req.body.currBal - req.body.amount,
                      'assets.$.fraction':
                        ((req.body.currBal - req.body.amount) * 100) /
                        currentHoldings,
                    },
                  }
                )
                  .then((result) => {
                    console.log('done');
                    res.send(result);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        Portfolio.findOneAndUpdate(
          { sub: req.body.sub },
          {
            $push: { assets: asset },
            currBal: req.body.currBal - req.body.amount,
          }
        )
          .then(() => {
            Portfolio.findOneAndUpdate(
              { sub: req.body.sub, assets: { $elemMatch: { id: 'usd' } } },
              {
                $set: {
                  'assets.$.quantity': req.body.currBal - req.body.amount,
                  'assets.$.holdings': req.body.currBal - req.body.amount,
                  'assets.$.fraction':
                    ((req.body.currBal - req.body.amount) * 100) /
                    currentHoldings,
                },
              }
            )
              .then((result) => {
                console.log('done');
                res.send(result);
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post('/sellCoin', (req, res, next) => {
  let currentHoldings = getHoldings(req.body.assets);
  Portfolio.findOne({
    sub: req.body.sub,
    assets: { $elemMatch: { id: req.body.asset.uuid } },
  })
    .then((result) => {
      if (result != null) {
        Portfolio.findOneAndUpdate(
          { sub: req.body.sub },
          { $pull: { assets: { id: req.body.asset.uuid } } }
        )
          .then(() => {
            let resAsset = result.assets.filter((_asset) => {
              return _asset.id === req.body.asset.uuid;
            });
            const asset = sellAsset(
              req.body.asset,
              req.body.amount,
              resAsset[0],
              currentHoldings
            );
            Portfolio.findOneAndUpdate(
              { sub: req.body.sub },
              {
                $push: { assets: asset },
                currBal: req.body.currBal + req.body.amount,
                holdings: currentHoldings,
              }
            )
              .then(() => {
                Portfolio.findOneAndUpdate(
                  { sub: req.body.sub, assets: { $elemMatch: { id: 'usd' } } },
                  {
                    $set: {
                      'assets.$.quantity': req.body.currBal + req.body.amount,
                      'assets.$.holdings': req.body.currBal + req.body.amount,
                      'assets.$.fraction':
                        ((req.body.currBal + req.body.amount) * 100) /
                        currentHoldings,
                    },
                  }
                )
                  .then((result) => {
                    console.log('done');
                    res.send(result);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        res.send({
          status: `invalid transaction! You dont own ${req.body.asset.uuid}`,
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post('/priceChange', (req, res, next) => {
  const portfolio = req.body.portfolio;
  const assets = portfolio.assets;
  let uuids = [];
  assets.forEach((asset) => {
    uuids.push(asset.id);
  });
  let priceHistory = [];
  uuids.forEach(async (id, index) => {
    if (index < 1) return;
    let apires;
    await axios
      .get(`https://api.coinranking.com/v2/coin/${id}/history?timePeriod=7d`)
      .then((response) => {
        apires = response.data.data.history;
      })
      .catch((e) => {
        console.log(e.message);
      });
    priceHistory.push(apires);
    if (index === uuids.length - 1) {
      res.send({ status: 'ok', history: priceHistory });
    }
  });
});

router.post('/portfolio_chart', jwtCheck, async (req, res, next) => {
  let priceHistory = req.body.priceHistory;
  let assets = req.body.assets;
  const currBal = assets[0].holdings;
  assets.shift();
  const portfolioChart = getPorfolioChart(assets, priceHistory, currBal);
  res.send({ portfolioChart });
});

// APP REQUESTS

router.get('/news', jwtCheck, async (req, res, next) => {
  axios
    .get(
      `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${process.env.COIN_COMPARE_API_KEY}`
    )
    .then((response) => {
      res.send(response.data);
    });
});

router.get('/crypto_data', jwtCheck, async (req, res, next) => {
  axios
    .get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cbinancecoin%2Ctether%2Czcash%2Cdogecoin%2Clitecoin%2Cethereum-classic%2Cvechain%2Ctron%2Ceos%2Ccosmos%2Cbasic-attention-token%2Cstellar%2Cbitcoin-cash%2Cpolkadot%2Cdash%2Cqtum%2Cuniswap%2Cfilecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
    )
    .then((response) => {
      res.send(response.data);
    });
});

router.get('/crypto_chart/:id', async (req, res, next) => {
  const id = req.params.id;
  const uuid = getUuid(id);
  const timePeriod = req.query.timePeriod;
  axios
    .get(
      `https://api.coinranking.com/v2/coin/${uuid}/history?timePeriod=${timePeriod}`,
      {
        headers: {
          'x-access-token': `${process.env.COIN_RANKING_API_KEY}`,
        },
      }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((e) => {
      res.send(e);
    });
});

router.get('/coin_data/:id', async (req, res, next) => {
  const id = req.params.id;
  const uuid = getUuid(id);
  axios
    .get(`https://api.coinranking.com/v2/coin//${uuid}`, {
      headers: {
        'x-access-token': `${process.env.COIN_RANKING_API_KEY}`,
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((e) => res.send(e));
});

router.get('/crypto_sparkline_data', async (req, res, next) => {
  axios
    .get(
      'https://api.coinranking.com/v2/coins?timePeriod=7d&uuids[]=Qwsogvtv82FCd&uuids[]=razxDUgYGNAdQ&uuids[]=WcwrkfNI4FUAe&uuids[]=HIVsRcGKkPFtW&uuids[]=a91GCGd_u96cF&uuids[]=25W7FG7om&uuids[]=_H5FVG9iW&uuids[]=ZlZpzOJo43mIo&uuids[]=D7B1x_ks7WhV5&uuids[]=hnfQfsYfeIGUQ&uuids[]=f3iaFeCKEmkaZ&uuids[]=FEbS54wxo4oIl&uuids[]=ymQub4fuB&uuids[]=qUhEFk1I61atv&uuids[]=Knsels4_Ol-Ny&uuids[]=iAzbfXiBBKkR6&uuids[]=C9DwH-T7MEGmo&uuids[]=aRGRWLf2RYNq4&uuids[]=bOm0xKUuDvCUu&uuids[]=pOnT-qfd-RN7W',
      {
        headers: {
          'x-access-token': `${process.env.COIN_RANKING_API_KEY}`,
        },
      }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((e) => res.send(e));
});

router.get('/public', async (req, res, next) => {
  res.send({ message: 'Public 🚀' });
});

module.exports = router;
