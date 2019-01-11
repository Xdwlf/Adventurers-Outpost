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
    SessionCart.find({sessionid: req.sessionID}).populate("items").exec(function(err, foundCart){
      if(err){
        console.log(err)
      } else{
        if(foundCart.length===0){
          res.render("shopping/cart");
        } else{
          res.render("shopping/cart", {cart: foundCart[0]})
        }
      }
    })
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
              let i = foundUser.cart.indexOf(foundProduct);
              if(i >= 0){
                foundUser.quantity[i] += req.body.quantity;
              } else{
                foundUser.cart.push(foundProduct);
                foundUser.quantity.push(req.body.quantity);
              }
              foundUser.save();
              res.redirect("/products");
            }
          })
        } else{
              SessionCart.find({sessionid: req.sessionID}, function(err, foundCart){
                if(err){
                  console.log(err);
                } else{
                  if(foundCart.length == 0){
                    SessionCart.create({sessionid: req.session.id}, function(err, createdCart){
                      createdCart.items.push(foundProduct);
                      createdCart.quantity.push(req.body.quantity);
                      createdCart.save();
                      console.log(createdCart);
                      res.redirect("/products")
                    })
                  } else{
                    console.log(foundCart);
                    foundCart[0].items.push(foundProduct);
                    foundCart[0].quantity.push(req.body.quantity);
                    foundCart[0].save();
                    console.log("no error");
                    console.log(foundCart);
                    res.redirect("/products")
                  }

                }
              })
        }

      }
    })

})


module.exports= router;
