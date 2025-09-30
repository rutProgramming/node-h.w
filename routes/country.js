const express = require('express');
const { CountryModel } = require('../Models/countryModel');
const router = express.Router();


router.get("/", async (req, res) => {
   let perPage = Math.min(req.query.perPage || 20)||4;
   let page =req.query.page || 1;
   let sort = req.query.sort || "_id";
let reverse = req.query.reverse == "yes" ? -1 : 1;
try {
    let countries = await CountryModel.find({})
       .limit(perPage)
       .skip((page - 1) * perPage)
       .sort({ [sort]: reverse });
    res.json(countries);

} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' , err});
}
});
router.post("/", async (req, res) => {
    try {
        let country = new CountryModel(req.body);
        let saved = await country.save();
        console.log("Saved document:", saved); 
        res.json(saved);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let data = await CountryModel.findByIdAndDelete(id);
    data.save();
    res.json(data)
})

module.exports = router;