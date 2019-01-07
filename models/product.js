var mongoose= require("mongoose");

var productSchema= new mongoose.Schema({
    name: String,
    image: String,
    category: String,
    price: Number,
    inventory: Number,
    description: String,
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }]
})

module.exports= mongoose.model("Product",productSchema);
