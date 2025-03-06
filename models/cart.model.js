const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",  // Fixed reference
      required: true 
    },
    items: [
      {
        menuItemId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Menu",  // Fixed reference
          required: true 
        },
        quantity: { 
          type: Number, 
          required: true, 
          default: 1, 
          min: 1 
        },
        price: { 
          type: Number, 
          required: true 
        }, // Added price field
      },
    ],
    totalPrice: { 
      type: Number, 
      required: true, 
      default: 0 
    },
  },
  { timestamps: true } // Added timestamps
);

// Automatically update total price before saving
CartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  next();
});

module.exports = mongoose.model("Cart", CartSchema);

