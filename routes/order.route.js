const router = require("express").Router();

const {CreateOrder , UpdateOrder , DeleteOrder , ReadAllOrder , ReadSingleOrder} = require("../controllers/order.controller")

router.get("/readAllOrders" ,ReadAllOrder)
router.post("/createOrder" ,CreateOrder)
router.get("/readSingleOrder/:id" , ReadSingleOrder)
router.put("/updateOrder/:id" , UpdateOrder)
router.delete("/deleteOrder/:id" , DeleteOrder)


module.exports = router;


