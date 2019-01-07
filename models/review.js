var mongoose= require("mongoose");

var reviewSchema= new mongoose.Schema({
  rating: Number,
  // author: {
  //   id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref="User"
  //   },
  //   username: String
  // },
  text: String,
  date: Date
})

module.exports= mongoose.model("Review", reviewSchema);
