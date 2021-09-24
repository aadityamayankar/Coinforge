const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  picture: { type: String, required: true },
  updated_at: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  email_verified: { type: Boolean, required: true },
  sub: { type: String, required: true, unique: true },
  premium: { type: Boolean, default: false },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
