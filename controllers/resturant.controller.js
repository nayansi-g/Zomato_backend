// const Resturants = require("../models/resturant.model")


// const CreateResturant = async (req, res)=>{

//     try {
//         const {resturantName, location , contactNumber, category, rating , openingTime , closingTime, image , description , menu} = req.body
//         const newResturant = new Resturants ({resturantName,
//              location ,
//               contactNumber,
//                category,
//                 rating ,
//                  openingTime ,
//                   closingTime,
//                    image ,
//                     description ,
//              menu: new mongoose.Types.ObjectId(menu)})
//          await newResturant.save();
//         res.status(200).json({message:"resturant created successfully"})
//     } catch (error) {
//         res.status(404).json({message:"resturant not created" , error:error})
//     }
// }


// const ReadSingleResturant = async (req,res)=>{

//     try {
//         const {id}= req.params
//         const getSingleResturant = await Resturants.findOne({_id:id})
//         res.status(200).json({getSingleResturant:getSingleResturant})
//     } catch (error) {
//         res.status(404).json({message:"can not getSingle resturant" , error:error})
//     }
// }


// const ReadAllResturant = async (req,res)=>{

//     try {
//         const getAllResturant = await Resturants.find();
//         res.status(200).json({getAllResturant:getAllResturant})
//     } catch (error) {
//         res.status(404).json({message:"can not get All resturants" , error:error})
//     }
// }

// const UpdateResturant = async (req,res)=>{

//     try {
//         const {id}= req.params
//         const updatedResturant = await Resturants.findByIdAndUpdate(id , req.body)
//         res.status(200).json({updatedResturant:updatedResturant})
//     } catch (error) {
//         res.status(404).json({message:"can not update resturants" , error:error})
//     }
// }


// const DeleteResturant = async (req,res)=>{

//     try {
//         const {id}= req.params
//         const deleteResturant = await Resturants.findByIdAndDelete(id)
//         res.status(200).json({message:"resturant deleted successfully"})
//     } catch (error) {
//         res.status(404).json({message:"can not delete resturants" , error:error})
//     }
// }


// module.exports= {CreateResturant, ReadAllResturant, ReadSingleResturant, DeleteResturant,UpdateResturant}


const mongoose = require("mongoose");
const Resturants = require("../models/resturant.model");

// Create a new restaurant
const CreateResturant = async (req, res) => {
    try {
        const { resturantName, location, contactNumber, category, rating, openingTime, closingTime, image, description, menu } = req.body;

        // Ensure menu is an array of ObjectIds
        const menuItems = menu ? menu.map(id => new mongoose.Types.ObjectId(id)) : [];

        const newResturant = new Resturants({
            resturantName,
            location,
            contactNumber,
            category,
            rating,
            openingTime,
            closingTime,
            image,
            description,
            menu: menuItems
        });

        await newResturant.save();
        res.status(201).json({ message: "Restaurant created successfully", restaurant: newResturant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Restaurant not created", error: error.message });
    }
};

// Read a single restaurant by ID
const ReadSingleResturant = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid restaurant ID" });
        }

        const getSingleResturant = await Resturants.findById(id).populate("menu");
        if (!getSingleResturant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ restaurant: getSingleResturant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cannot fetch restaurant", error: error.message });
    }
};

// Read all restaurants
const ReadAllResturant = async (req, res) => {
    try {
        const getAllResturant = await Resturants.find().populate("menu");
        res.status(200).json({ restaurants: getAllResturant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cannot fetch all restaurants", error: error.message });
    }
};

// Update a restaurant by ID
const UpdateResturant = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid restaurant ID" });
        }

        const updatedResturant = await Resturants.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedResturant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ message: "Restaurant updated successfully", restaurant: updatedResturant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cannot update restaurant", error: error.message });
    }
};

// Delete a restaurant by ID
const DeleteResturant = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid restaurant ID" });
        }

        const deleteResturant = await Resturants.findByIdAndDelete(id);
        if (!deleteResturant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cannot delete restaurant", error: error.message });
    }
};

module.exports = { CreateResturant, ReadAllResturant, ReadSingleResturant, DeleteResturant, UpdateResturant };
