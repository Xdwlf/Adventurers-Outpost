var mongoose= require("mongoose"),
    Product = require("./models/product"),
    Review = require("./models/review");

var data =[{
  name: "Cyborg Eye",
  category: "tech",
  image: "/images/cyborgeye.jpg",
  description: "A beautifully designed replacement eye for cyborgs",
  inventory: 2
},
{
  name: "Black Hole Holder",
  category: "tech",
  image: "/images/blackholeholder.jpg",
  description: "A mechanism for holding up to 5 black holes for easy access.",
  inventory: 5
},
{
  name: "Bottled Unicorn Dreams",
  category: "consumable",
  image: "/images/bottledunicorndreams.jpg",
  description: "Carefully extracted from northwestern wild unicorns. Sustainable harvested.",
  inventory: 12
},
{
  name: "Bottomless Sack",
  category: "clothing",
  image: "/images/bottomlesssack-sametechnologyassanta.jpg",
  description: "Gorgeous bottomless sack for storing gadgets. Same technology as used in Santa's workshop",
  inventory: 3
},
{
  name: "Butt Cup",
  category: "tech",
  image: "/images/buttcoolingcupholder.jpg",
  description: "The coolest holder for your buttocks.",
  inventory: 5
},
]

function seedDB(){
  Product.remove({},function(err){
    if(err){
      console.log(err);
    } else{
      console.log("removed all products");
      data.forEach(function(seed){
        Product.create(seed, function(err,product){
          if(err){
            console.log(err);
          } else{
            console.log("added product");
          }
        })
      })
    }
  });
}

module.exports= seedDB;
