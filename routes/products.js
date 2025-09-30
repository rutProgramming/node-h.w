const express = require("express");
const { ProductModel } = require("../Models/ProductModel");
const router = express.Router();

router.get("/", async (req, res) => {
  let data = await ProductModel.find({});
  console.log(data);
  
  res.json(data);
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let data = await ProductModel.findOne({ _id: id });
  res.json(data);
});
router.post("/", async (req, res) => {
  let product = new ProductModel(req.body);
  await product.save();
  res.json(product);
});
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let data = await ProductModel.findByIdAndDelete(id);
  res.json(data);
});

module.exports = router;
