var express = require("express");
var User = require("../models/user");
var passport = require("passport");
var router = express.Router();

router.get("/", function(req,res){
  res.render("home");
});

//Register form page
router.get("/register",function(req,res){
  res.render("register");
})

router.post("/", function(req,res){
  console.log(req.body.user);
  var newUser = new User({
    email: req.body.email,
    username: req.body.username
  })
  User.register(newUser, req.body.password, function(err,user){
    console.log("registering user");
    if(err){
      console.log(err);
      res.redirect("/register");
    }
    console.log("no err in mongoose")
    passport.authenticate("local")(req,res,function(){
      console.log(user);
      res.send("user saved");
    })
  })
})



module.exports = router;
