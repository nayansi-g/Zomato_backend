const router = require("express").Router();

const {CreateMenu , ReadMenu , ReadSingleMenu , UpdateMenu, DeleteMenu} = require("../controllers/menu.controller")


router.post("/createMenu" , CreateMenu)
router.get("/readAllMenus" , ReadMenu)
router.get("/readSIngleMenu/:id" , ReadSingleMenu)
router.put("/updateMenu/:id" , UpdateMenu)
router.delete("/deleteMenu/:id" , DeleteMenu)


module.exports= router
