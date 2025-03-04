const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt)
        const newUser = new User({ name, email, password: hashPassword })

        let avlEmail = await User.findOne({ email });
        let avlUserName = await User.findOne({ name })
        console.log("EMAIL", avlEmail);
        console.log("Username", avlUserName);

        if (avlEmail || avlUserName) {
            res.status(400).json({ message: "User_Already_Exist" })
        } else {
            await newUser.save();
            res.status(200).json({ message: "user created successfully" })
        }

    } catch (error) {
        console.log(error)
        res.status(404).json({ error: error, message: "something went wrong", })
    }
}


const LogIn = async (req, res) => {
    try {
        const { email, password , name} = req.body
        const validUser = await User.findOne({ email: email }).populate()

        if (!validUser) {
            res.status(404).json({ message: " Please signUp First" })

        } else {
            const authUser = bcrypt.compareSync(password, validUser.password)
            if (authUser) {
                let token = jwt.sign({name:validUser.name, email:validUser.email} , "gduysfdyfsudvsgiudkjfi7tdgj")
                res.status(200).json({token:token , id: validUser._id})

            } else {
                res.status(404).json({ message: "incorrect password" })

            }
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error, message: "internal server error" })

    }
}


module.exports = { SignUp, LogIn }