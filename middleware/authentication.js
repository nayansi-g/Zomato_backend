const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const Protect =(req, res , next)=>{
    try {
        const {token} = req.headers
        const varify = jwt.verify(token,"gduysfdyfsudvsgiudkjfi7tdgj")
        if(varify){
            next();
        }else{
            res.status(401).json({message:"unauthorised user"})
        }
    } catch (error) {
        res.status(401).json({message:"unauthorised user"})
    }
}



module.exports = Protect