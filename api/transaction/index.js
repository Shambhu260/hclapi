const express = require("express");
const controller = require("./transaction.controller")
const router = express.Router();
var verifyToken = require('../auth/auth');
router.post("/login", controller.login)
router.post("/add",verifyToken, controller.register)
router.get("/transactions/:customerId",verifyToken, controller.getTransactionById)
router
module.exports = router 
