var express = require("express"),
    User = require("../models/user"),
    Product = require("../models/product"),
    Order = require("../models/order"),
    middleware = require("../middleware"),
    router = express.Router();

router.get("/", middleware.isLoggedIn, function(req,res){
  res.render("profile/profile")
})

//shows wishlist
router.get("/wishlist", middleware.isLoggedIn, function(req,res){
  User.findById(req.user._id).populate("wishlist").exec(function(err, foundUser){
    if(err){
      req.flash("error", err.message);
      res.redirect("/profile");
    } else{
      res.render("profile/wishlist", {user: foundUser})
    }
  })
})

//adds a new item to wishlist
router.post("/wishlist", middleware.isLoggedIn, function(req,res){
  User.findById(req.user._id, function(err, foundUser){
    if(err){
      req.flash("error", err.message);
      res.redirect("/profile")
    } else{
      Product.findById(req.body.product_id, function(err, foundProduct){
        if(err){
          req.flash("error", err.message);
          res.redirect("/profile")
        } else{
          if(findItemIndex(foundUser.wishlist, foundProduct)<0){
            foundUser.wishlist.push(foundProduct);
            foundUser.save();
          }
          req.flash("success", "You've successfully added " + foundProduct.name + " to your wishlist! May all your wishes come true and may our pockets fill with gold.")
          res.redirect("back");
        }
      })
    }
  })
})

//delete item from wishlist
router.delete("/wishlist", middleware.isLoggedIn, function(req,res){
  User.findById(req.user._id, function(err, foundUser){
    if(err){
      req.flash("error", err.message);
      res.redirect("back");
    } else{
      Product.findById(req.body.product_id, function(err, foundProduct){
        if(err){
          req.flash("error", err.message);
          res.redirect("back");
        } else{
          var index= findItemIndex(foundUser.wishlist, foundProduct);
          console.log(foundUser.wishlist)
          foundUser.wishlist = removeItemFromCart(foundUser.wishlist, index);
          foundUser.save();
          req.flash("success", "You've successfully removed "+ foundProduct.name + " from your wishlist. It's a little bit disappointing and we're a little angry.")
          res.redirect("back")
        }
      })
    }
  })
})

//show user's orders
router.get("/orders", middleware.isLoggedIn, function(req,res){
  User.findById(req.user._id).populate("orders").populate("items").exec(function(err, foundUser){
    if(err){
      req.flash("error", err.message);
      res.redirect("back")
    } else{
      res.render("profile/orders", {user:foundUser})
    }
  })
})

//show specific order info
router.get("/orders/:order_id", function(req,res){
  Order.findById(req.params.order_id).populate("items").exec(function(err, foundOrder){
    if(err){
      req.flash("error", err.message);
      res.redirect("back");
    } else{
      res.render("profile/show", {order: foundOrder})
    }
  })
})


function findItemIndex(array, item){
  for(let i = 0; i< array.length; i++){
    if(array[i]._id.equals(item._id)){
      return i;
    }
  }
  return -1;
}

function removeItemFromCart(array, index){
  array= array.filter(function(item, i){
    if(i !== index){
      return item;
    }
  })
  return array;
}

module.exports = router;
