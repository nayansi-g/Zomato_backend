// const { default: mongoose } = require("mongoose");
// const Order = require("../models/order.model")


// //create 

// const CreateOrder = async(req,res)=>{
//     try {

//         let {user,resturant,items,totalPrice,orderStatus,paymentStatus,deliveryAddress,placedAt}= req.body;
//         items = items.map(item=>{
//             return {menuItem: new mongoose.Types.ObjectId(item.menuItem), ...item}
//         })
//         const newOrder = await new Order({
//             user:new mongoose.Types.ObjectId(user),
//             resturant:new mongoose.Types.ObjectId(resturant),
//             items,
//             totalPrice,
//             orderStatus,
//             paymentStatus,
//             deliveryAddress,
//             placedAt
//         });
//         console.log(newOrder, "New Order")
//         await newOrder.save()
//         res.status(201).json({message:"Oreder Created SuccessFully"})

//     } catch (error) {
//         res.status(501).json({error:error,message:"Oreder not Created"})
//         console.log(error)
//     }
// }

// //read all
// const ReadAllOrder = async(req,res)=>{
//     try {
//         const readAllOrders = await Order.find().populate("items.menuItem").exec();
//         res.status(201).json({readAllOrders:readAllOrders})
//     } catch (error) {
//         res.status(404).json({error:error,message:"Orders not found"})
//     }
// }

// //readSingle
// const ReadSingleOrder = async(req,res)=>{
//     try {
//         const {id} = req.params
//         const readSingleOrder = await Order.findById(id);
//         res.status(200).json({readSingleOrder:readSingleOrder})
//     } catch (error) {
//         res.status(404).json({error:error,message:"Orders not found"})
//     }
// }


// //update

// const UpdateOrder = async(req,res)=>{
//     try {
//         const {id} = req.params
//         const updateOrder = await Order.findByIdAndUpdate(id , req.body) 
//         res.status(200).json({message:"order updated successfuly",updateOrder:updateOrder})
//     } catch (error) {
//         res.status(404).json({error:error, message:"order not updated"})
//     }
// }


// //delete
// const DeleteOrder = async(req,res)=>{
//     try {
//         const {id} = req.params
//         const deleteOrder = await Order.findByIdAndDelete(id)
//         res.status(200).json({message:"order deleted successfuly"})
//     } catch (error) {
//         res.status(404).json({error:error, message:"order not found"})
//     }
// }


// module.exports = {CreateOrder , UpdateOrder , DeleteOrder , ReadAllOrder , ReadSingleOrder}


const mongoose = require("mongoose");
const Order = require("../models/order.model");

// Create Order
const CreateOrder = async (req, res) => {
    try {
        let { user, resturant, items, totalPrice, orderStatus, paymentStatus, deliveryAddress, placedAt } = req.body;

        // Ensure items have valid ObjectIds
        items = items.map(item => ({
            menuItem: new mongoose.Types.ObjectId(item.menuItem),
            quantity: item.quantity,
            price: item.price
        }));

        const newOrder = new Order({
            user: new mongoose.Types.ObjectId(user),
            resturant: new mongoose.Types.ObjectId(resturant),
            items,
            totalPrice,
            orderStatus,
            paymentStatus,
            deliveryAddress,
            placedAt
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Order not created", error: error.message });
    }
};

// Read All Orders
const ReadAllOrder = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email") // Populate user with name and email
            .populate("resturant", "resturantName location") // Populate restaurant details
            .populate("items.menuItem", "itemName price") // Populate menu items
            .exec();

        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Orders not found", error: error.message });
    }
};

// Read Single Order
const ReadSingleOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid order ID" });
        }

        const order = await Order.findById(id)
            .populate("user", "name email")
            .populate("resturant", "resturantName location")
            .populate("items.menuItem", "itemName price");

        if (!order) {
            return res.status(404).json({ message: `Order with ID ${id} not found` });
        }

        res.status(200).json({ order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching order", error: error.message });
    }
};

// Update Order
const UpdateOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid order ID" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: `Order with ID ${id} not found` });
        }

        res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Order not updated", error: error.message });
    }
};

// Delete Order
const DeleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid order ID" });
        }

        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: `Order with ID ${id} not found` });
        }

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting order", error: error.message });
    }
};

module.exports = { CreateOrder, ReadAllOrder, ReadSingleOrder, UpdateOrder, DeleteOrder };
