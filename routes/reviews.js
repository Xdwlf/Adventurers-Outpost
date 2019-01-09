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

module.exports = router;
