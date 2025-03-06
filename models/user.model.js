const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    order: [{
        type: mongoose.Types.ObjectId,
        ref: "Order"
    }
    ]
})


module.exports =  mongoose.model("User" , userSchema);