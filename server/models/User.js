const mongoose = require("mongoose");

const UserShema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true},
        isAdmin: {
            type: Boolean, 
            default: false,
        },
        img: {
            type: String,
            require: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserShema);