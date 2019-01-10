var express= require("express"),
  Cart = require("../models/cart"),
  Product = require("../models/product"),
  User = require("../models/user"),
  SessionCart = require("../models/sessioncart"),
  router = express.Router();

router.get("/cart", function(req,res){
  if(req.user){
    User.findById(req.user._id).populate("cart").exec(function(err, foundUser){
      if(err){
        console.log(err);
        res.redirect("/products");
      } else{
        res.render("shopping/cart", {user: foundUser});
      }
    })
  } else{
    res.render("shopping/cart");
  }

})

router.post("/cart", function(req,res){
    Product.findById(req.body.product_id, function(err, foundProduct){
      if(err){
        console.log(err);
        res.redirect("/products");
      } else{
        if (req.user) {
          User.findById(req.user._id, function(err, foundUser){
            if(err){
              console.log(err);
              res.redirect("/products");
            } else{
              foundUser.cart.push(foundProduct);
              foundUser.quantity.push(req.body.quantity);
              foundUser.save();
              console.log(foundUser);
              res.redirect("/products");
            }
          })
        } else{
              SessionCart.find({sessionid: req.sessionID}, function(err, foundCart){
                if(err){
                  SessionCart.create({sessionid: req.session.id}, function(err, createdCart){
                    createdCart.items.push(foundProduct);
                    res.redirect("/products")
                  })
                } else{
                  foundCart.items.push(foundProduct)
                  foundCart.save();
                  console.log("no error");
                  console.log(foundCart);
                }
              })
        }

      }
    })

})

module.exports= router;
