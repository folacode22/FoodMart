const router = require('express').Router();
const { completeRegister, createUser, findAllUser } = require("../controller/users");

router.post("/create", createUser)
router.put("/update", completeRegister);
router.get("/findall",findAllUser);








module.exports = router;