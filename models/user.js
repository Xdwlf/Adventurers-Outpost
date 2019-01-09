var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  password: String,
  username: String,
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
  email: String
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
