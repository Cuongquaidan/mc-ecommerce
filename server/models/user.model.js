const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: String,
        avatar: String,
        role: String,
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.models.User || mongoose.model("user", userSchema);

module.exports = UserModel;
