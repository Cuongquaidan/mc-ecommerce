const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function register(req, res) {
    try {
        const { email, password, avatar, name, address, phone } = req.body;

        if (!email || !password || !avatar || !name || !address || !phone) {
            return res
                .status(400)
                .json({ error: "All fields are required", success: false });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            email,
            password: hashPassword,
            avatar,
            role: "user",
            name,
            address,
            phone,
        });
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

async function login(req, res) {
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
                .json({ error: "Please check password", success: false });
        }
        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.TOKEN_SECRET_KEY,
            {
                expiresIn: "8h",
            }
        );
        const tokenOptions = {
            httpOnly: true,
            credentials: "include",
            secure: true,
        };
        return res.status(200).cookie("token", token, tokenOptions).json({
            message: "User logged in successfully",
            success: true,
            error: false,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Server error",
            success: false,
            error: true,
        });
    }
}

async function getInfo(req, res) {
    try {
        const user = await UserModel.findById(req.user._id);

        const { password, ...userNoPass } = user._doc;

        return res.status(200).json({
            message: "User information",
            success: true,
            data: userNoPass,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Server error",
            success: false,
            error: true,
        });
    }
}

async function logout(req, res) {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "User logged out successfully",
            success: true,
            error: false,
            data: [],
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: true,
        });
    }
}

async function getAll(req, res) {
    try {
        const users = await UserModel.find();
        return res.status(200).json({
            message: "All users",
            success: true,
            data: users,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: true,
        });
    }
}

async function updateUser(req, res) {
    try {
        const user = req.user;

        if (user.role !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to perform this action",
                success: false,
                error: true,
                data: user,
            });
        }

        const { userId } = req.params;
        const { role } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { role });
        console.log(req.body);
        return res.status(200).json({
            message: "User updated successfully",
            success: true,
            data: updatedUser,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: true,
        });
    }
}

async function updateUserInfo(req, res) {
    try {
        const user = req.user;
        const { name, address, phone } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            { name, address, phone },
            { new: true }
        );
        const { password, ...userNoPass } = updatedUser;
        return res.status(200).json({
            message: "User information updated successfully",
            success: true,
            data: userNoPass,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: true,
        });
    }
}

module.exports = {
    register,
    login,
    getInfo,
    logout,
    getAll,
    updateUser,
    updateUserInfo,
};
