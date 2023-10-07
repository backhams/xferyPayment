//This is schema defined structure of document exmaple{name ,email,phone etc...so on}
const mongoose = require("mongoose");

const userPaymentSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  variantId: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

//User collection creator

const userPayment = mongoose.model("UserPayment", userPaymentSchema);

module.exports = userPayment
