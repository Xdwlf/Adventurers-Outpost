var express = require("express");

var router = express.Router();

router.get("/", function(req,res){
  res.render("home");
});

router.get("/register",function(req,res){
  res.send("register");
})



module.exports = router;
