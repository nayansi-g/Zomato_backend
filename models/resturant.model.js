const mongoose = require("mongoose");

const resturantSchema = new mongoose.Schema(
    {
        resturantName: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["Indian", "Chinese", "Italian", "Fast Food", "Desserts", "Cafe", "Others"],
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        openingTime: {
            type: String, // e.g., "09:00 AM"
            required: true,
        },
        closingTime: {
            type: String, // e.g., "10:00 PM"
            required: true,
        },
        image: {
            type: String, // URL of the restaurant image
        },
        description: {
            type: String,
        },
        menu: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Menu", // Reference to the Menu model
            },
        ],
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("resturant", resturantSchema);
