var mongoose= require("mongoose");

var reviewSchema= new mongoose.Schema({
  title: String,
  rating: Number,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username: String
  },
  text: String,
  author: String,
  created: {type: Date,
  default: Date.now}
})

module.exports= mongoose.model("Review", reviewSchema);
