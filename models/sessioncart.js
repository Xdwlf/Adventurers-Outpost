var mongoose = require("mongoose");

sessionCartSchema = new mongoose.Schema({
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
  quantity: [Number],
  sessionid: String
})

module.exports = mongoose.model("SessionCart", sessionCartSchema);
