const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
export async function register(req, res) {
    try {
        const { email, password, avatar } = req.body;

        if (!email || !password || !avatar) {
            return res
                .status(400)
                .json({ error: "All fields are required", success: false });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({ email, hashPassword, avatar });
        const data = await newUser.save();
        return res.status(201).json({
            data,
            message: "User created successfully",
            success: true,
            error: false,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message, success: false, error: true });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "All fields are required", success: false });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ error: "User not found", success: false });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res
                .status(400)
                .json({ error: "Invalid credentials", success: false });
        }
        return res
            .status(200)
            .json({ message: "User logged in successfully", success: true });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Server error",
            success: false,
            error: true,
        });
    }
}
