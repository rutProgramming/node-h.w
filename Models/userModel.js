const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { config } = require('../config/secret');

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date_created: { type: Date, default: Date.now } 
});

exports.UserModel = mongoose.model('users', userSchema);

exports.createToken=(_userId)=>{
    return jwt.sign({ _id: _userId }, config.jwtSecret, { expiresIn: "1h" });
};

exports.validateUser = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(99).required()
    });
    return joiSchema.validate(_reqBody);
}

exports.validateLogin = (_reqBody) => {
    let joiSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(99).required()
    });
    return joiSchema.validate(_reqBody);
}