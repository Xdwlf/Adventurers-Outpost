var express= require("express"),
  Cart = require("../models/cart"),
  Product = require("../models/product"),
  User = require("../models/user"),
  SessionCart = require("../models/sessioncart"),
  router = express.Router();

//displays user or sessions current shopping cart
router.get("/cart", function(req,res){
  if(req.user){
    User.findById(req.user._id).populate("cart").exec(function(err, foundUser){
      if(err){
        console.log(err);
        res.redirect("/products");
      } else{
        res.render("shopping/cart", {user: foundUser, cart:null});
      }
    })
  } else{
    SessionCart.find({sessionid: req.sessionID}).populate("items").exec(function(err, foundCart){
      if(err){
        console.log(err)
      } else{
        if(foundCart.length===0){
          res.render("shopping/cart",{cart:null});
        } else{
          res.render("shopping/cart", {cart: foundCart[0]})
        }
      }
    })
  }
})

//adds a product to the cart
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
              let i = findItemIndex(foundUser.cart, foundProduct);
              if(i >= 0){
                let newQuantity = foundUser.quantity[i]+ parseInt(req.body.quantity);
                foundUser.quantity.set(i, newQuantity);
              } else{
                foundUser.cart.push(foundProduct);
                foundUser.quantity.push(req.body.quantity);
              }
              foundUser.save(function(err){
                if(err) console.log(err)
                else res.redirect("/products");
              });
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
                      res.redirect("/products")
                    })
                  } else{
                    let i = findItemIndex(foundCart[0].items, foundProduct);
                    if( i>=0 ){
                      let newQuantity = foundCart[0].quantity[i] + parseInt(req.body.quantity);
                      foundCart[0].quantity.set(i, newQuantity);
                    } else{
                      foundCart[0].items.push(foundProduct);
                      foundCart[0].quantity.push(req.body.quantity);
                    }
                    foundCart[0].save(function(err){
                      if(err) console.log(err);
                      else res.redirect("/products")
                    });
                  }

                }
              })
        }
      }
    })
})

//update item amount in cart
router.put("/cart", function(req,res){
  if(req.user){
    User.findById(req.user._id, function(err, foundUser){
      if(err){
        console.log(err)
      } else{
        foundUser.quantity.set(parseInt(req.body.itemIndex), parseInt(req.body.itemQuantity));
        console.log(foundUser);
        foundUser.save();
        res.redirect("/cart");
      }
    })
  } else{
    console.log("itemIndex" + req.body.itemIndex);
    console.log("itemQuantity" + req.body.itemQuantity);
    SessionCart.find({sessionid: req.sessionID}, function(err, foundCart){
      if(err){
        console.log(err);
      } else{
        foundCart[0].quantity.set(parseInt(req.body.itemIndex), parseInt(req.body.itemQuantity));
        foundCart[0].save();
        res.redirect("/cart");
      }
    })
  }
})

//remove item from Cart
router.delete("/cart", function(req,res){
  if(req.user){
    console.log(req.body.itemIndex);
    User.findById(req.user._id, function(err, foundUser){
      if(err){
        console.log(err);
      } else{
        let index = parseInt(req.body.itemIndex);
        foundUser.cart = removeItemFromCart(foundUser.cart, index);
        foundUser.quantity = removeItemFromCart(foundUser.quantity, index);
        foundUser.save();
        res.redirect("/cart");
      }
    })
  } else{
    console.log("removing from sessionCart")
    SessionCart.find({sessionid: req.sessionID}, function(err, foundCart){
      if(err){
        console.log(err);
      } else{
        let index = parseInt(req.body.itemIndex);
        foundCart[0].items = removeItemFromCart(foundCart[0].items, index);
        foundCart[0].quantity = removeItemFromCart(foundCart[0].quantity, index);
        foundCart[0].save();
        res.redirect("/cart");
      }
    })
  }
})

//finds index of mongoose item in a mongoose array
function findItemIndex(array, item){
  for(let i = 0; i< array.length; i++){
    if(array[i]._id.equals(item._id)){
      return i;
    }
  }
  return -1;
}

//removes a product from mongoose cart
function removeItemFromCart(array, index){
  array= array.filter(function(item, i){
    if(i !== index){
      return item;
    }
  })
  return array;
}


module.exports= router;
