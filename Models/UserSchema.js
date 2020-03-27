const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({
  email: { type: String },
  username: { type: String },
  password: { type: String },
  role: { type: String, default: 'user' },
  token: { type: String, default: null }
});

mongoose.plugin(timeStamp);

const User = mongoose.model('User', UserSchema);
module.exports = User;