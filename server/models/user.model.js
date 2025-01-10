const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true,
            required: true,
        },
        address: {
            type: String,
            default: "",
        },
        phone: {
            type: String,
            default: "",
        },
        password: String,
        avatar: String,
        role: String,
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = UserModel;
