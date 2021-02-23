import mongoose from "mongoose";

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

const User = mongoose.model("user", userSchema);

export default User;
