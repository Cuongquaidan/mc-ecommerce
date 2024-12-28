const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});

const categoryModel =
    mongoose.models.category || mongoose.model("category", categorySchema);

module.exports = categoryModel;
