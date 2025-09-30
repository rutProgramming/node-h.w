const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
  cat: String,
  name: String,
  price: Number,
  image: String,
});

exports.ProductModel = mongoose.model("products", productSchema);
