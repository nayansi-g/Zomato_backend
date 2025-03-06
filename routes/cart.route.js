// const express = require("express");
// const Cart = require("../models/Cart");
// const MenuItem = require("../models/MenuItem");
// const router = express.Router();

// // Add Item to Cart
// router.post("/add", async (req, res) => {
//   const { userId, menuItemId, quantity } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId });
//     const menuItem = await MenuItem.findById(menuItemId);

//     if (!menuItem) return res.status(404).json({ error: "Menu item not found" });

//     if (!cart) {
//       cart = new Cart({ userId, items: [{ menuItemId, quantity }], totalPrice: menuItem.price * quantity });
//     } else {
//       const existingItem = cart.items.find((item) => item.menuItemId.toString() === menuItemId);
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         cart.items.push({ menuItemId, quantity });
//       }
//       cart.totalPrice += menuItem.price * quantity;
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get Cart Items
// router.get("/:userId", async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.menuItemId");
//     if (!cart) return res.status(404).json({ message: "Cart is empty" });
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Remove Item from Cart
// router.post("/remove", async (req, res) => {
//   const { userId, menuItemId } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ error: "Cart not found" });

//     cart.items = cart.items.filter((item) => item.menuItemId.toString() !== menuItemId);
//     cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.menuItemId.price, 0);

//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;



const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");

const router = express.Router();

// Add Item to Cart
router.post("/add", async (req, res) => {
  const { userId, menuItemId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(menuItemId)) {
    return res.status(400).json({ error: "Invalid userId or menuItemId" });
  }

  try {
    let cart = await Cart.findOne({ userId });
    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) return res.status(404).json({ error: "Menu item not found" });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ menuItemId: new mongoose.Types.ObjectId(menuItemId), quantity }],
        totalPrice: menuItem.price * quantity,
      });
    } else {
      const existingItem = cart.items.find((item) => item.menuItemId.toString() === menuItemId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ menuItemId: new mongoose.Types.ObjectId(menuItemId), quantity });
      }
      cart.totalPrice += menuItem.price * quantity;
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Cart Items
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate("items.menuItemId", "itemName price");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove Item from Cart
router.put("/remove", async (req, res) => {
  const { userId, menuItemId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(menuItemId)) {
    return res.status(400).json({ error: "Invalid userId or menuItemId" });
  }

  try {
    let cart = await Cart.findOne({ userId }).populate("items.menuItemId", "price");

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    // Find the item to be removed
    const itemIndex = cart.items.findIndex((item) => item.menuItemId._id.toString() === menuItemId);
    if (itemIndex === -1) return res.status(404).json({ error: "Item not found in cart" });

    // Subtract item price from total price
    cart.totalPrice -= cart.items[itemIndex].quantity * cart.items[itemIndex].menuItemId.price;
    cart.items.splice(itemIndex, 1); // Remove item

    // If cart is empty, delete it
    if (cart.items.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ message: "Cart deleted as it was empty" });
    }

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
