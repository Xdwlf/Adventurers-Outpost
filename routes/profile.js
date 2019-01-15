var express = require("express"),
    User = require("../models/user"),
    Product = require("../models/product"),
    router = express.Router();

router.get("/", function(req,res){
  res.render("profile/profile")
})

router.get("/wishlist", function(req,res){
  res.render("profile/wishlist")
})

router.get("/orders", function(req,res){
  res.render("profile/orders")
})

module.exports = router;
