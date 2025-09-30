const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../Middlewares/auth");
const { UserModel, validateUser, validateLogin, createToken } = require("../Models/userModel");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ message: "Users work" });
});

router.post("/register", async (req, res) => {
  let validateBody = validateUser(req.body);
  if (validateBody.error) {
    return res.status(400).json(validateBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    user.password = "****";
    res.status(201).json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res
        .status(400)
        .json({
          message: "Email already in system, try to login",
          code: 11000,
        });
    }
    console.log(err);
    res.status(500).json({ message: "err", err });
  }
});

router.post("/login", async (req, res) => {
    let validBody = validateLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "password or email is wrong" });
        }
        let isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "password or email is wrong" });
        }
        let token = createToken(user._id);
        res.json({ token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "err", err });
    }
}); 

router.get("/myEmail", auth, async (req, res) => {
try
{
    let userData=await UserModel.findOne({_id:req.tokenData._id},{email:1});
    res.json(userData);
}   
catch(err){
    console.log(err);
    res.status(500).json({message:"err",err});
}
});

router.get('/getInfo',auth,async(req,res)=>{
    try{
        let userData=await UserModel.findOne({_id:req.tokenData._id},{password:0});
        res.json(userData);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"err",err});
    }
})

module.exports = router;
