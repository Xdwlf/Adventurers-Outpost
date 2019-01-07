var express= require("express"),
    Product = require("../models/product"),
    router = express.Router();


router.get("/", function(req,res){
  Product.find({}, function(err,allProducts){
    if(err){
      console.log(err);
    } else{
      res.render("products",{products: allProducts});
    }
  })
})

router.get("/clothing", function(req,res){
  res.render("clothing");
})

router.get("/tech", function(req,res){
  Product.find({category: "tech"}, function(err,allTech){
    if(err){
      console.log(err);
    } else{
      res.render("tech",{products: allTech});
    }
  })
})

router.get("/consumables", function(req,res){
  res.render("consumables");
});

module.exports= router;
