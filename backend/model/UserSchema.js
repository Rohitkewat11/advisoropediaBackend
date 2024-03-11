const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); // import jsonWebToken library//
require("dotenv").config(); // import dotenv file//

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  token: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("user", userSchema);
