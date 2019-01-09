var express= require("express"),
  Cart = require("../models/cart"),
  Product = require("../models/product"),
  User = require("../models/user"),
  router = express.Router();

router.get("/cart", function(req,res){
  res.render("shopping/cart");
})

router.post("/cart", function(req,res){
  Product.findById(req.body.product_id, function(err, foundProduct){
    if(err){
      console.log(err);
      res.redirect("/products");
    } else{
      User.findById(req.user._id, function(err, foundUser){
        if(err){
          console.log(err);
          res.redirect("/products");
        } else{
          foundUser.cart(foundProduct);
          foundUser.save();
          console.log(foundUser);
          res.redirect("/products");
        }
      })
    }
  })
})

module.exports= router;
