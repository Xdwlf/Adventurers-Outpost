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
                    console.log(foundCart[0].items);
                    console.log(foundProduct);
                    let i = findItemIndex(foundCart[0].items, foundProduct);
                    if( i>=0 ){
                      let newQuantity = foundCart[0].quantity[i] + parseInt(req.body.quantity);
                      foundCart[0].quantity.set(i, newQuantity);
                      console.log(foundCart[0]);
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

//remove item from Cart
router.delete("/cart", function(req,res){
  if(req.user){
    console.log(req.body.itemIndex);
    User.findById(req.user._id, function(err, foundUser){
      if(err){
        console.log(err);
      } else{

      }
    })
  } else{
    console.log("removing from sessionCart")
  }
  res.send("this is the delete item from cart route")
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
