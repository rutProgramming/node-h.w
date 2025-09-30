const mongoose=require('mongoose');

let foodSchema=new mongoose.Schema({
    name:String,
    price:Number,
    cal:Number
});
exports.validateFood = (_reqBody) => {
  // הצהרה על וולדיציה חדשה בתוך הפונקציה
  let joiSchema = Joi.object(
    {
      name: Joi.string().min(2).max(99).required(),
      price: Joi.number().min(1).max(999999).required(),
      cal: Joi.number().min(0).max(999999).required()
    }
    // בדיקה האם הבאדי שהמשתש שלח עובר את הוולדיציה 
  )
  return joiSchema.validate(_reqBody);
}

exports.FoodModel=mongoose.model('foods',foodSchema);