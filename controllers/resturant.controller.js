const Resturants = require("../models/resturant.model")


const CreateResturant = async (req, res)=>{

    try {
        const {resturantName, location , contactNumber, category, rating , openingTime , closingTime, image , description , menu} = req.body
        const newResturant = new Resturants ({resturantName,
             location ,
              contactNumber,
               category,
                rating ,
                 openingTime ,
                  closingTime,
                   image ,
                    description ,
             menu: new mongoose.Types.ObjectId(menu)})
         await newResturant.save();
        res.status(200).json({message:"resturant created successfully"})
    } catch (error) {
        res.status(404).json({message:"resturant not created" , error:error})
    }
}


const ReadSingleResturant = async (req,res)=>{

    try {
        const {id}= req.params
        const getSingleResturant = await Resturants.findOne({_id:id})
        res.status(200).json({getSingleResturant:getSingleResturant})
    } catch (error) {
        res.status(404).json({message:"can not getSingle resturant" , error:error})
    }
}


const ReadAllResturant = async (req,res)=>{

    try {
        const getAllResturant = await Resturants.find();
        res.status(200).json({getAllResturant:getAllResturant})
    } catch (error) {
        res.status(404).json({message:"can not get All resturants" , error:error})
    }
}

const UpdateResturant = async (req,res)=>{

    try {
        const {id}= req.params
        const updatedResturant = await Resturants.findByIdAndUpdate(id , req.body)
        res.status(200).json({updatedResturant:updatedResturant})
    } catch (error) {
        res.status(404).json({message:"can not update resturants" , error:error})
    }
}


const DeleteResturant = async (req,res)=>{

    try {
        const {id}= req.params
        const deleteResturant = await Resturants.findByIdAndDelete(id)
        res.status(200).json({message:"resturant deleted successfully"})
    } catch (error) {
        res.status(404).json({message:"can not delete resturants" , error:error})
    }
}


module.exports= {CreateResturant, ReadAllResturant, ReadSingleResturant, DeleteResturant,UpdateResturant}


