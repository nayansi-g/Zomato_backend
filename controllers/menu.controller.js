const Menu = require("../models/menu.model")

//create menu 

const CreateMenu = async (req, res) => {
    try {
        const { resturant, itemName, description, price, category, image, availability } = req.body
        const newMenu = new Menu({ resturant:new mongoose.Types.ObjectId(resturant), itemName, description, price, category, image, availability })
        await newMenu.save();
        res.status(201).json({ message: "menu created successfuly" })
    } catch (error) {
        res.status(404).json({ error: error, message: "somthing went wrong" })
    }
}


//readAll Menus

const ReadMenu = async (req, res) => {
    try {
        const readMenus = await Menu.find();
        res.status(200).json({ readMenus: readMenus })
    } catch (error) {
        res.status(404).json({ error: error, message: "menu not found" })
    }
}

//readSingle menu


const ReadSingleMenu = async (req, res) => {
    try {
        const { id } = req.params
        const readSingleMenu = await Menu.findById(id);
        res.status(200).json({ readSingleMenu: readSingleMenu })
    } catch (error) {
        res.status(404).json({ error: error, message: " single menu not found" })
    }
}

//update

const UpdateMenu = async (req, res) => {
    try {
        const { id } = req.params
        const updateMenu = await Menu.findByIdAndUpdate(id, req.body)
        res.status(200).json({ message:"menu updated successfuly" ,updateMenu: updateMenu })
    } catch (error) {
        res.status(404).json({ error: error, message: "menu not updated" })
    }
}


//delete

const DeleteMenu = async (req, res) => {
    try {
        const { id } = req.params
        const deleteMenu = await Menu.findByIdAndDelete(id)
        res.status(200).json({message:"menu deleted successfuly" })
    } catch (error) {
        res.status(404).json({ error: error, message: "menu not deleted" })
    }
}


module.exports = {CreateMenu , ReadMenu , ReadSingleMenu , UpdateMenu, DeleteMenu}
