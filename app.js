var   express = require("express"),
      bodyParser= require("body-parser"),
      mongoose= require("mongoose"),
      Product= require("./models/product"),
      Review = require("./models/review"),
      seedDB = require("./seed"),
      app     = express();

mongoose.connect("mongodb://localhost/sample_shop");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
seedDB();


app.get("/", function(req,res){
  res.render("home");
});

app.get("/products", function(req,res){
  Product.find({}, function(err,allProducts){
    if(err){
      console.log(err);
    } else{
      res.render("products",{products: allProducts});
    }
  })
})

app.get("/products/clothing", function(req,res){
  res.render("clothing");
})

app.get("/products/tech", function(req,res){
  Product.find({category: "tech"}, function(err,allTech){
    if(err){
      console.log(err);
    } else{
      res.render("tech",{products: allTech});
    }
  })
})

app.get("/products/consumables", function(req,res){
  res.render("consumables");
})


app.listen(process.env.PORT || 3000, function(){
  console.log("Shop server is running");
})
