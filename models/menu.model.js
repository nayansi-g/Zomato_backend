const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
    {
        resturant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "resturant", 
            required: true,
        },
        itemName: {
            type: String,
            required: true, // Name of the menu item
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: ["Appetizer", "Main Course", "Dessert", "Beverage", "Snack", "Others"],
            required: true,
        },
        image: {
            type: String, // URL of the menu item image
        },
        availability: {
            type: Boolean,
            default: true, // Whether the menu item is available
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("menu", menuSchema);
