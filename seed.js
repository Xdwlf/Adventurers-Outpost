var mongoose= require("mongoose"),
    Product = require("./models/product"),
    Review = require("./models/review"),
    User = require("./models/user");

var data =[{
  name: "Cyborg Eye",
  category: "tech",
  image: "/images/cyborgeye.jpg",
  description: "A beautifully designed replacement eye for cyborgs",
  inventory: 2,
  price: 99000
},
{
  name: "Black Hole Holder",
  category: "tech",
  image: "/images/blackholeholder.jpg",
  description: "A mechanism for holding up to 5 black holes for easy access.",
  inventory: 5,
  price: 125550
},
{
  name: "Bottled Unicorn Dreams",
  category: "consumable",
  image: "/images/bottledunicorndreams.jpg",
  description: "Carefully extracted from northwestern wild unicorns. Sustainable harvested.",
  inventory: 12,
  price: 13430
},
{
  name: "Bottomless Sack",
  category: "clothing",
  image: "/images/bottomlesssack-sametechnologyassanta.jpg",
  description: "Gorgeous bottomless sack for storing gadgets. Same technology as used in Santa's workshop",
  inventory: 3,
  price: 60800
},
{
  name: "Butt Cup",
  category: "tech",
  image: "/images/buttcoolingcupholder.jpg",
  description: "The coolest holder for your buttocks.",
  inventory: 5,
  price: 325.99
},
{
  name: "Health Potion",
  category: "consumable",
  image: "/images/healthpotion.jpg",
  description: "A handy way to regen your hp when surrounded by goblins!",
  inventory: 50,
  price: 600.01
},
{
  name: "Futuristic Cockroach",
  category: "tech",
  image: "/images/futuristiccockroach.jpg",
  description: "In need of an out of this world gag gift? Check out this cockroach.",
  inventory: 12,
  price: 38999.99
},
{
  name: "Pheromone Replica",
  category: "consumable",
  image: "/images/pheromonereplicator.jpg",
  description: "An antique! Add the muskiest scent to your scales and smell like a human!",
  inventory: 3,
  price: 8600.50
},
{
  name: "Run Fast Gear",
  category: "clothing",
  image: "/images/runfastgear.jpg",
  description: "Rubber padded soles to ensure maximum bounce. Recommended for two feet. May or may not be compatible for tentacles.",
  inventory: 16,
  price: 488.60
},
{
  name: "Witch's brewing kit",
  category: "consumable",
  image: "/images/witchbrewingbeginnerkit.jpg",
  description: "Interested in learning how to brew? Get a heads start with this Witch's brewing kit! Learn to make your first soul stealing potion(frog warts not included).",
  inventory: 6,
  price: 3750
}
]

var reviews= [{
  title: "Best item ever!",
  author: "HubbaWubba",
  text: "I know this sounds overrated but this really helped my levelling. I could summon corpses in no time and it helped my necromancy career",
  rating: 5
},{
  title: "Brain Dead",
  author: "Billy",
  text: "Whoever made this had no idea what they were doing. Nearly lost a leg.",
  rating: 2
}
]

var users=[{
  username: "HubbaWubba",
  email: "hb@gmail.com"
}]

var password="password";


function seedDB(){
  User.remove({},function(err){
    User.register(users[0], password, function(err, user){
      if(err){
        console.log(err);
      }
    console.log("users removed");
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
              Review.create(reviews[0], function(err, newlyCreatedReview){
                if(err){
                  console.log(err);
                } else{
                  newlyCreatedReview.author.id = user._id;
                  newlyCreatedReview.author.username= user.username;
                  newlyCreatedReview.save();
                  product.reviews.push(newlyCreatedReview);
                  product.save();
                  console.log("created new review");
                }
              })
            }
          })
        })
      }
    });
    })
  })

}

module.exports= seedDB;
