var express = require("express");

var router = express.Router();

router.get("/", function(req,res){
  res.render("home");
});

//Register form page
router.get("/register",function(req,res){
  res.send("register");
})



module.exports = router;
