const router = require("express").Router();
const {CreateResturant, ReadAllResturant, ReadSingleResturant, DeleteResturant,UpdateResturant} = require("../controllers/resturant.controller")

router.post("/createResturant" , CreateResturant);
router.get("/readAllResturants" , ReadAllResturant);
router.get("/readSingleResturant/:id" , ReadSingleResturant);
router.put("/updateResturant/:id" , UpdateResturant);
router.delete("/deleteResturant/:id" , DeleteResturant);


module.exports = router;
