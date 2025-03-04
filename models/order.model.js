const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true, // Reference to the User model
        },
        resturant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "resturant",
            required: true, // Reference to the Restaurant model
        },
        items: [
            {
                menuItem: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "menu", // Reference to the Menu item
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1, // Ensure at least one item is ordered
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true, // Store the calculated total order price
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Confirmed", "Preparing", "On the Way", "Delivered", "Cancelled"],
            default: "Pending", // Default status for new orders
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },
        deliveryAddress: {
            type: String,
            required: true, // User's delivery address
        },
        placedAt: {
            type: Date,
            default: Date.now, // Automatically store the order date
        },
    },
    { timestamps: true } 
);

module.exports = mongoose.model("order", orderSchema);
