var mongoose = require("mongoose");

sessionCartSchema = new mongoose.Schema({
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
  frequency: [Number],
  sessionid: Number
})

module.exports = mongoose.model("SessionCart", sessionCartSchema);
