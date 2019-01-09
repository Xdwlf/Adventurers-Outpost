var express= require("express"),
    Product = require("../models/product"),
    router = express.Router();


router.get("/", function(req,res){
  Product.find({}, function(err,allProducts){
    if(err){
      console.log(err);
    } else{
      res.render("products/products",{products: allProducts});
    }
  })
})

router.get("/clothing", function(req,res){
  Product.find({category: "clothing"}, function(err,allClothing){
    if(err){
      console.log(err);
    } else{
      res.render("products/clothing",{products: allClothing});
    }
  })
})

router.get("/tech", function(req,res){
  Product.find({category: "tech"}, function(err,allTech){
    if(err){
      console.log(err);
    } else{
      res.render("products/tech",{products: allTech});
    }
  })
})

router.get("/consumables", function(req,res){
  Product.find({category: "consumable"}, function(err,allConsumables){
    if(err){
      console.log(err);
    } else{
      res.render("products/consumables",{products: allConsumables});
    }
  })
});

//ROUTES TO ADD NEW PRODUCT TO CATALOG

//RENDERS FORM FOR NEW Product
router.get("/new", function(req,res){
  res.render("products/new");
});

//posts new product to database
router.post("/",function(req,res){
  var newProduct = req.body.product;
  Product.create(newProduct, function(err, newlyCreatedProduct){
    if(err){
      console.log(err);
    } else{
      res.redirect("/products");
    }
  })
})

//Product show page
router.get("/:id",function(req,res){
  Product.findById(req.params.id).populate("reviews").exec(function(err, foundProduct){
    if(err){
      console.log(err);
      res.redirect("/products")
    } else{
      console.log(foundProduct);
      res.render("products/show",{product: foundProduct});
    }
  })
})

module.exports= router;
