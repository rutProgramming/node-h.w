const express = require('express');
const router = express.Router();
const { FoodModel, validateFood } = require('../Models/foodModel');

router.get('/', async (req, res) => {
    let data = await FoodModel.find({});
    res.json(data);
});
router.post("/", async(req,res) => {
 
  let validBody = validateFood(req.body);

  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let food = new FoodModel(req.body);
    await food.save();
    res.status(201).json(food);
  }
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let data = await FoodModel.findOne({ _id: id });
    res.json(data);
});
router.post('/', async (req, res) => {
    let food = new FoodModel(req.body);
    await food.save();
    res.json(food);
});

router.put("/:id", async (req, res) => {
  let validBody = validateFood(req.body);
  if (validBody.error) {
    res.status(400).json(validBody.error.details);
    return;
  }
  try {
    let id = req.params.id;
    let data = req.body;
    let result = await foodModel.updateOne({ _id: id }, data);
    res.json(result);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "There is a problem try again later", err });
  }
});
router.delete("/:idDel",async(req,res) => {
  try{
    let idDel = req.params.idDel
    let data = await FoodModel.deleteOne({_id:idDel});
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})

module.exports = router;