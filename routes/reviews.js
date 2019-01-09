var express = require("express"),
    Review = require("../models/review"),
    Product = require("../models/product"),
    router = express.Router({mergeParams:true});

router.get("/", function(req,res){
  res.send("This is the review route")
})

//shows page to add new review
router.get("/new", function(req,res){
  res.render("reviews/new", {product_id:req.params.id});
})

//Posts review to database
router.post("/", function(req,res){
  Product.findById(req.params.id, function(err, foundProduct){
    if(err){
      console.log(err);
      res.redirect("/products");
    } else{
      Review.create(req.body.review, function(err, createdReview){
        if(err){
          console.log(err);
          res.redirect("/products/"+ req.params.id);
        } else{
          foundProduct.reviews.push(createdReview);
          foundProduct.save();
          console.log(foundProduct);
          res.redirect("/products/"+ foundProduct._id);
        }
      })
    }
  })
})

//Show edit review page
router.get("/:review_id/edit",function(req,res){
  Review.findById(req.params.review_id, function(err, foundReview){
    if(err){
      console.log(err);
      res.redirect("/products/" + req.params.id);
    } else{
      res.render("reviews/edit",{product_id: req.params.id, review:foundReview});
    }
  })
})

//UPDATE review with PUT
router.put("/:review_id", function(req,res){
  Review.findByIdAndUpdate(req.params.review_id, req.body.review, function(err, updatedReview){
    if(err){
      console.log(err);
      res.redirect("/products/"+req.params.id);
    } else{
      res.redirect("/products/"+req.params.id);
    }
  })
})

module.exports = router;
