const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 4000
const userRouter = require("./routes/user.route")
const resturantRouter = require("./routes/resturant.route")
const menuRouter = require("./routes/menu.route")
const orderRouter = require("./routes/order.route")
const cartRouter = require("./routes/order.route")
const Authenticate = require("./middleware/authentication")
require("./config/connection")

app.use(express.json())
app.use(cors("dev"))


app.use("/user", userRouter);
app.use("/resturants", resturantRouter);
app.use("/menu" , menuRouter)
app.use("/order",Authenticate , orderRouter);
app.use("/cart" , Authenticate , cartRouter)


app.listen(port , (err)=>{
    if(!err){
        console.log(`my app is running on ${port}`)
    }else{
        console.log("app is not running")
    }
})