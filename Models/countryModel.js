const Joi = require('joi');
const mongoose = require('mongoose');

let countrySchema = new mongoose.Schema({
    name: String,
    capital: String,
    pop: Number,
    img: String,
    date_created: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }

});

exports.validateCountry = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        capital: Joi.string().min(2).max(99).required(),
        pop: Joi.number().min(0).max(999999999).required(),
        img: Joi.string().min(2).max(999).required(),
    });
    return joiSchema.validate(_reqBody);
}

exports.CountryModel = mongoose.model('countries', countrySchema);
