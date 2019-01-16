var express = require("express"),
    User = require("../models/user"),
    Product = require("../models/product"),
    router = express.Router();

router.get("/", function(req,res){
  res.render("profile/profile")
})

router.get("/wishlist", function(req,res){
  User.findById(req.user._id).populate("wishlist").exec(function(err, foundUser){
    if(err){
      console.log(err)
    } else{
      res.render("profile/wishlist", {user: foundUser})
    }
  })
})

router.post("/wishlist", function(req,res){
  User.findById(req.user._id, function(err, foundUser){
    if(err){
      console.log(err)
    } else{
      Product.findById(req.body.product_id, function(err, foundProduct){
        if(err){
          console.log(err)
        } else{
          console.log(findItemIndex(foundUser.wishlist, foundProduct))
          if(findItemIndex(foundUser.wishlist, foundProduct)<0){
            foundUser.wishlist.push(foundProduct);
            foundUser.save();
          }
          res.redirect("back");
        }
      })
    }
  })
})

router.delete("/wishlist", function(req,res){
  User.findById(req.user._id, function(err, foundUser){
    if(err){
      console.log(err)
    } else{
      Product.findById(req.body.product_id, function(err, foundProduct){
        if(err){
          console.log(err);
        } else{
          var index= findItemIndex(foundUser.wishlist, foundProduct);
          console.log(foundUser.wishlist)
          foundUser.wishlist = removeItemFromCart(foundUser.wishlist, index);
          foundUser.save();
          res.redirect("back")
        }
      })
    }
  })
})

router.get("/orders", function(req,res){
  res.render("profile/orders")
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
