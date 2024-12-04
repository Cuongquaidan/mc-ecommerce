const UserModel = require("../models/user.model");

const adminPermission = async (userId) => {
    const user = await UserModel.findById(userId);
    return user.role === "admin";
};

module.exports = {
    adminPermission,
};
