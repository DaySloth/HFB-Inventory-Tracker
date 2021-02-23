const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone_num: String,
    date_updated: {
        type: Date,
        default: Date.now,
    },
});

const user = mongoose.model("user", userSchema);

module.exports = mongoose.models.user || user;
