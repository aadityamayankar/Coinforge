const uuids = {
  bitcoin: 'Qwsogvtv82FCd',
  ethereum: 'razxDUgYGNAdQ',
  binancecoin: 'WcwrkfNI4FUAe',
  tether: 'HIVsRcGKkPFtW',
  dogecoin: 'a91GCGd_u96cF',
  polkadot: '25W7FG7om',
  uniswap: '_H5FVG9iW',
  bitcoincash: 'ZlZpzOJo43mIo',
  litecoin: 'D7B1x_ks7WhV5',
  ethereumclassic: 'hnfQfsYfeIGUQ',
  stellar: 'f3iaFeCKEmkaZ',
  vechain: 'FEbS54wxo4oIl',
  filecoin: 'ymQub4fuB',
  tron: 'qUhEFk1I61atv',
  cosmos: 'Knsels4_Ol-Ny',
  eos: 'iAzbfXiBBKkR6',
  dash: 'C9DwH-T7MEGmo',
  zcash: 'aRGRWLf2RYNq4',
  qtum: 'bOm0xKUuDvCUu',
  basicattentiontoken: 'pOnT-qfd-RN7W',
};

const getUuid = (id) => {
  let uid = id.toString();
  const reg = /-/g;
  uid = uid.replace(reg, '');
  return uuids[uid];
};

const formatAsset = (coin, amount, holdings) => {
  let asset = {
    name: coin.name,
    id: coin.uuid,
    price: Number(coin.price),
    buy_price: Number(coin.price),
    avg_price:
      coin.sparkline.map(Number).reduce((a, b) => a + b) /
      coin.sparkline.length,
    quantity: amount / coin.price,
    holdings: amount,
    fraction: (amount * 100) / holdings,
    price_change: 0,
    profit: 0,
    profit_precentage: 0,
    history: [],
    bought_data: Date.now(),
  };
  return asset;
};

const updateAsset = (coin, amount, asset, holdings) => {
  asset.price = Number(coin.price);
  asset.avg_price =
    coin.sparkline.map(Number).reduce((a, b) => a + b) / coin.sparkline.length;
  asset.quantity = asset.quantity + amount / coin.price;
  asset.holdings = asset.quantity * asset.price;
  asset.fraction = (asset.holdings * 100) / holdings;
  asset.price_change = coin.price - asset.buy_price;
  asset.profit = asset.price_change * asset.quantity;
  asset.profit_precentage =
    (asset.profit * 100) / (asset.buy_price * asset.quantity);
  return asset;
};

const getHoldings = (assets) => {
  let currentHoldings = 0;
  assets.forEach((asset) => {
    currentHoldings += Number(asset.holdings);
  });
  console.log(currentHoldings);
  return currentHoldings;
};

const sellAsset = (coin, amount, asset, holdings) => {
  asset.price = Number(coin.price);
  asset.avg_price =
    coin.sparkline.map(Number).reduce((a, b) => a + b) / coin.sparkline.length;
  asset.quantity = asset.quantity - amount / coin.price;
  asset.holdings = asset.quantity * asset.price;
  asset.fraction = (asset.holdings * 100) / holdings;
  asset.price_change = coin.price - asset.buy_price;
  asset.profit = asset.price_change * asset.quantity;
  asset.profit_precentage =
    (asset.profit * 100) / (asset.buy_price * asset.quantity);
  return asset;
};

const getPorfolioChart = (assets, priceChange, currBal) => {
  if (typeof priceChange === 'string') priceChange = JSON.parse(priceChange);
  priceChange.forEach((x, i) => {
    x.forEach((o) => {
      o.price *= assets[i].quantity;
    });
  });
  let portfolioChart = [];
  for (let i = 0; i < priceChange.length; i++) {
    for (let j = 0; j < priceChange[i].length; j++) {
      portfolioChart[j] = {
        price: currBal,
        timestamp: priceChange[i][j].timestamp,
      };
    }
  }
  for (let i = 0; i < priceChange.length; i++) {
    for (let j = 0; j < priceChange[i].length; j++) {
      portfolioChart[j].price =
        (portfolioChart[j].price || 0) + priceChange[i][j].price;
    }
  }
  return portfolioChart;
};

module.exports = {
  getUuid,
  formatAsset,
  updateAsset,
  getHoldings,
  sellAsset,
  getPorfolioChart,
};
