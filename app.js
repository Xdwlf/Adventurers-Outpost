var   express = require("express"),
      bodyParser= require("body-parser"),
      mongoose= require("mongoose"),
      methodOverride = require("method-override"),
      passport = require("passport"),
      localStrategy = require("passport-local"),
      session = require("express-session"),
      Product= require("./models/product"),
      Review = require("./models/review"),
      User = require("./models/user")
      seedDB = require("./seed"),
      app     = express();

var productRoutes = require("./routes/products"),
    reviewRoutes = require("./routes/reviews"),
    mainRoutes = require("./routes/index"),
    shoppingRoutes = require("./routes/shopping");

mongoose.connect("mongodb://localhost/sample_shop");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

seedDB();

app.use(session({ //creates new id everytime: MUST FIX
  secret: "The Cake is a Lie",
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false,
  maxAge: 600000}
}))

// app.use(session({
//   genid: function(req){
//     return genuuid();
//   },
//   secret: "The Cake is a Lie"
// }))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for every request


app.use(function(req,res,next){
  console.log(req.session);
  res.locals.session = req.session;
  res.locals.currentUser = req.user;
  next();
})

app.use("/", mainRoutes);
app.use("/products", productRoutes);
app.use("/products/:id/reviews", reviewRoutes);
app.use(shoppingRoutes);


app.listen(process.env.PORT || 3000, function(){
  console.log("Shop server is running");
})
