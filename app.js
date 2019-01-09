var   express = require("express"),
      bodyParser= require("body-parser"),
      mongoose= require("mongoose"),
      Product= require("./models/product"),
      Review = require("./models/review"),
      seedDB = require("./seed"),
      app     = express();

var productRoutes = require("./routes/products"),
    reviewRoutes = require("./routes/reviews");

mongoose.connect("mongodb://localhost/sample_shop");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
seedDB();


app.get("/", function(req,res){
  res.render("home");
});


app.use("/products", productRoutes);
app.use("/products/:id/reviews", reviewRoutes)


app.listen(process.env.PORT || 3000, function(){
  console.log("Shop server is running");
})
