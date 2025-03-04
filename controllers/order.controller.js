const { default: mongoose } = require("mongoose");
const Order = require("../models/order.model")


//create 

const CreateOrder = async(req,res)=>{
    try {

        let {user,resturant,items,totalPrice,orderStatus,paymentStatus,deliveryAddress,placedAt}= req.body;
        items = items.map(item=>{
            return {menuItem: new mongoose.Types.ObjectId(item.menuItem), ...item}
        })
        const newOrder = await new Order({
            user:new mongoose.Types.ObjectId(user),
            resturant:new mongoose.Types.ObjectId(resturant),
            items,
            totalPrice,
            orderStatus,
            paymentStatus,
            deliveryAddress,
            placedAt
        });
        console.log(newOrder, "New Order")
        await newOrder.save()
        res.status(201).json({message:"Oreder Created SuccessFully"})

    } catch (error) {
        res.status(501).json({error:error,message:"Oreder not Created"})
        console.log(error)
    }
}

//read all
const ReadAllOrder = async(req,res)=>{
    try {
        const readAllOrders = await Order.find().populate("items.menuItem").exec();
        res.status(201).json({readAllOrders:readAllOrders})
    } catch (error) {
        res.status(404).json({error:error,message:"Orders not found"})
    }
}

//readSingle
const ReadSingleOrder = async(req,res)=>{
    try {
        const {id} = req.params
        const readSingleOrder = await Order.findById(id);
        res.status(200).json({readSingleOrder:readSingleOrder})
    } catch (error) {
        res.status(404).json({error:error,message:"Orders not found"})
    }
}


//update

const UpdateOrder = async(req,res)=>{
    try {
        const {id} = req.params
        const updateOrder = await Order.findByIdAndUpdate(id , req.body) 
        res.status(200).json({message:"order updated successfuly",updateOrder:updateOrder})
    } catch (error) {
        res.status(404).json({error:error, message:"order not updated"})
    }
}


//delete
const DeleteOrder = async(req,res)=>{
    try {
        const {id} = req.params
        const deleteOrder = await Order.findByIdAndDelete(id)
        res.status(200).json({message:"order deleted successfuly"})
    } catch (error) {
        res.status(404).json({error:error, message:"order not found"})
    }
}


module.exports = {CreateOrder , UpdateOrder , DeleteOrder , ReadAllOrder , ReadSingleOrder}

