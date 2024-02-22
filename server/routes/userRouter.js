const express = require('express');
const router = express.Router();
const {addUser, userLogin} = require("./../controllers/usersController.js")

router.post("/register", addUser)
router.post("/login", userLogin)

module.exports = router