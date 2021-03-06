var express = require("express"),
    Review = require("../models/review"),
    Product = require("../models/product"),
    middleware = require("../middleware"),
    router = express.Router({mergeParams:true});

router.get("/", middleware.isLoggedIn, function(req,res){
  res.send("This is the review route")
})

//shows page to add new review
router.get("/new", middleware.isLoggedIn, function(req,res){
  res.render("reviews/new", {product_id:req.params.id});
})

//Posts review to database
router.post("/", middleware.isLoggedIn, function(req,res){
  Product.findById(req.params.id, function(err, foundProduct){
    if(err){
      req.flash("error", err.message);
      res.redirect("/products");
    } else{
      Review.create(req.body.review, function(err, createdReview){
        if(err){
          req.flash("error", err.message);
          res.redirect("/products/"+ req.params.id);
        } else{
          createdReview.author.id = req.user._id;
          createdReview.author.username= req.user.username;
          createdReview.save();
          foundProduct.reviews.push(createdReview);
          foundProduct.save();
          req.flash("success", "Successfully posted review! Telling us your opinion greatly helps us suck out your soul(s).");
          res.redirect("/products/"+ foundProduct._id);
        }
      })
    }
  })
})

//Show edit review page
router.get("/:review_id/edit", middleware.isLoggedIn, function(req,res){
  Review.findById(req.params.review_id, function(err, foundReview){
    if(err){
      req.flash("error", err.message);
      res.redirect("/products/" + req.params.id);
    } else{
      res.render("reviews/edit",{product_id: req.params.id, review:foundReview});
    }
  })
})

//UPDATE review with PUT
router.put("/:review_id", middleware.isLoggedIn, function(req,res){
  Review.findByIdAndUpdate(req.params.review_id, req.body.review, function(err, updatedReview){
    if(err){
      req.flash("error", err.message);
      res.redirect("/products/"+req.params.id);
    } else{
      req.flash("success", "Successfully updated your review. It better be a good change or we're coming after you.")
      res.redirect("/products/"+req.params.id);
    }
  })
})

module.exports = router;
