const mongoose = require("mongoose");

const ProductShema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        description: {type: String, require: true},
        img: {type: String, required: true},
        categories: {type: Array},
        size: {type: String},
        color: {type: String},
        price: {type: String, require: true},
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", ProductShema);