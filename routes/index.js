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

//Creates User
router.post("/", function(req,res){
  var newUser = new User({
    email: req.body.email,
    username: req.body.username
  })
  User.register(newUser, req.body.password, function(err,user){
    if(err){
      res.redirect("/register");
    }
    passport.authenticate("local")(req,res,function(){
      res.redirect("/products");
    })
  })
})

//Login Route
router.get("/login", function(req,res){
  res.render("login");
})

//logs in
router.post("/login", passport.authenticate("local", {
  successRedirect: "/products",
  failureRedirect: "/login"
}), function(req, res){
})

router.get("/logout", function(req,res){
  req.logout();
  res.redirect("/products");
})


module.exports = router;
