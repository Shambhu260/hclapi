const mongoose = require("mongoose")
const transactionSchema = new mongoose.Schema({
    customerId: {type: String,default: "ABC001"},
    transactionDescription: {type: String},
    amount: {type: Number},
    paymentType: {type: String, default: "credit"},
    dateTime: {type: Date, required: true, default: Date.now()},
})
module.exports = mongoose.model("transaction", transactionSchema, "transaction")