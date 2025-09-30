const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { CountryModel, validateCountry } = require("../Models/countryModel");
const { auth } = require("../Middlewares/auth");

router.get("/", (req, res) => {
  CountryModel.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.post("/", auth, async (req, res) => {
  let validateBody = validateCountry(req.body);

  if (validateBody.error) {
    return res.status(400).json(validateBody.error.details);
  }

  try {
    req.body.user_id = req.user._id;

    let country = new CountryModel(req.body);
    let saved = await country.save();
    console.log("Saved document:", saved);
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  let id = req.params.id;
  let validateBody = validateCountry(req.body);
  if (validateBody.error) {
    return res.status(400).json(validateBody.error.details);
  }
  req.body.user_id = req.user._id;
  let data = await CountryModel.findByIdAndUpdate(id, req.body, { new: true });
  res.json(data);
});
router.delete("/:id", auth, async (req, res) => {
  try {
    let id = req.params.id;

    let data = await CountryModel.findOneAndDelete({
      _id: id,
      user_id: req.tokenData._id,
    });
    if (!data) return res.status(404).json({ message: "Country not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
