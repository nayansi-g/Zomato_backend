const mongoose = require("mongoose")

const connect = ( async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Zomato_clone")
        console.log("connected to database")
    } catch (error) {
        console.log("error in database",error)
    }
})();

module.exports = connect