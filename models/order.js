var mongoose = require("mongoose")

var orderSchema = new mongoose.Schema({
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
  quantity: [Number],
  date: {
    type: Date,
    default: Date.now
  },
  billingAddress:{
    name: String,
    email: String,
    address: String,
    city: String,
    zip: Number,
    state: String,
    country: String
  },
  total: Number
})

module.exports = mongoose.model("Order", orderSchema)
