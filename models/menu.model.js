const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
    {
        restaurant: {  // Fixed spelling from resturant → restaurant
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant", // Fixed reference to match the correct model
            required: true,
        },
        itemName: {
            type: String,
            required: true, // Name of the menu item
        },
        description: {
            type: String, // Made optional (not all items may have a description)
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
        images: [{  // Changed from `image` to an array `images`
            type: String, // URLs of menu item images
        }],
        availability: {
            type: Boolean,
            default: true, // Whether the menu item is available
        },
        isVeg: {  // Added vegetarian flag (optional)
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema); // Changed to uppercase "Menu"
