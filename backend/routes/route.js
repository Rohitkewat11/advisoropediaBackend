
const express = require("express");
const router = express.Router();


const {users,adduser,login} = require("../controller/routefun");

router.route("/").get(users);
router.route("/adduser").post(adduser);
router.route("/login").post(login);


module.exports = router;