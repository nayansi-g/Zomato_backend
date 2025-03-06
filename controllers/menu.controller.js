// const Menu = require("../models/menu.model")

// //create menu 

// const CreateMenu = async (req, res) => {
//     try {
//         const { resturant, itemName, description, price, category, image, availability } = req.body
//         const newMenu = new Menu({ resturant:new mongoose.Types.ObjectId(resturant), itemName, description, price, category, image, availability })
//         await newMenu.save();
//         res.status(201).json({ message: "menu created successfuly" })
//     } catch (error) {
//         res.status(404).json({ error: error, message: "somthing went wrong" })
//     }
// }


// //readAll Menus

// const ReadMenu = async (req, res) => {
//     try {
//         const readMenus = await Menu.find();
//         res.status(200).json({ readMenus: readMenus })
//     } catch (error) {
//         res.status(404).json({ error: error, message: "menu not found" })
//     }
// }

// //readSingle menu


// const ReadSingleMenu = async (req, res) => {
//     try {
//         const { id } = req.params
//         const readSingleMenu = await Menu.findById(id);
//         res.status(200).json({ readSingleMenu: readSingleMenu })
//     } catch (error) {
//         res.status(404).json({ error: error, message: " single menu not found" })
//     }
// }

// //update

// const UpdateMenu = async (req, res) => {
//     try {
//         const { id } = req.params
//         const updateMenu = await Menu.findByIdAndUpdate(id, req.body)
//         res.status(200).json({ message:"menu updated successfuly" ,updateMenu: updateMenu })
//     } catch (error) {
//         res.status(404).json({ error: error, message: "menu not updated" })
//     }
// }


// //delete

// const DeleteMenu = async (req, res) => {
//     try {
//         const { id } = req.params
//         const deleteMenu = await Menu.findByIdAndDelete(id)
//         res.status(200).json({message:"menu deleted successfuly" })
//     } catch (error) {
//         res.status(404).json({ error: error, message: "menu not deleted" })
//     }
// }


// module.exports = {CreateMenu , ReadMenu , ReadSingleMenu , UpdateMenu, DeleteMenu}


const mongoose = require("mongoose");
const Menu = require("../models/menu.model");

// Create a new menu item
const CreateMenu = async (req, res) => {
    try {
        const { resturant, itemName, description, price, category, image, availability } = req.body;

        const newMenu = new Menu({
            resturant, 
            itemName,
            description,
            price,
            category,
            image,
            availability
        });

        await newMenu.save();
        res.status(201).json({ message: "Menu created successfully", menu: newMenu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// Read all menu items
const ReadMenu = async (req, res) => {
    try {
        const readMenus = await Menu.find().populate("resturant");
        res.status(200).json({ menus: readMenus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Menu not found", error: error.message });
    }
};

// Read a single menu item by ID
const ReadSingleMenu = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid menu ID" });
        }

        const readSingleMenu = await Menu.findById(id).populate("resturant");
        if (!readSingleMenu) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({ menu: readSingleMenu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cannot fetch menu item", error: error.message });
    }
};

// Update a menu item by ID
const UpdateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid menu ID" });
        }

        const updateMenu = await Menu.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateMenu) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({ message: "Menu updated successfully", menu: updateMenu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Menu not updated", error: error.message });
    }
};

// Delete a menu item by ID
const DeleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid menu ID" });
        }

        const deleteMenu = await Menu.findByIdAndDelete(id);
        if (!deleteMenu) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({ message: "Menu deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Menu not deleted", error: error.message });
    }
};

module.exports = { CreateMenu, ReadMenu, ReadSingleMenu, UpdateMenu, DeleteMenu };
