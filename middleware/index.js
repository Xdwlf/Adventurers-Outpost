var Review = require("../models/review");

var middlewareobj = {};

middlewareobj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else{
    req.flash("error", "You must be logged in to do that.")
    res.redirect("/login");
  }
}

middlewareobj.isAuthorized = function(req, res, next){
  if(req.isAuthenticated() && req.user.isAuthorized){
    return next();
  } else{
    req.flash("error", "You are not authorized to do that")
    res.redirect("back");
  }
}

module.exports = middlewareobj;
