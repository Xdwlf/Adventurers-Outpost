var express = require("express"),
    User = require("../models/user"),
    Product = require("../models/product"),
    router = express.Router();

router.get("/", function(req,res){
  res.render("profile/profile")
})

module.exports = router;
