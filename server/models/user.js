const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  pass: String,
  city: String,
  country: String,
  zip: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;