const router = require('express').Router();
const { completeRegister, createUser, findAllUser, findUser } = require("../controller/users");

router.post("/create", createUser)
router.put("/update", completeRegister);
router.get("/findall",findAllUser);
router.get("./find:id",findUser)







module.exports = router;