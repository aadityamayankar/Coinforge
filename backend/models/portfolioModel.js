const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    sub: { type: String, required: true, unique: true },
    currBal: { type: Number, required: true, default: '50000' },
    holdings: { type: Number, required: true, default: '50000' },
    priceChange: { type: Array, required: true, default: [] },
    assets: { type: Array, required: true, default: [] },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model('Porfolio', portfolioSchema);

module.exports = Portfolio;
