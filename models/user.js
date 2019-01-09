var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
  // carts: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Cart"
  // }],
  // orders: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Order"
  // }]
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
