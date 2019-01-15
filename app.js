var   express = require("express"),
      bodyParser= require("body-parser"),
      mongoose= require("mongoose"),
      methodOverride = require("method-override"),
      passport = require("passport"),
      localStrategy = require("passport-local"),
      session = require("express-session"),
      MongoDBStore = require("connect-mongodb-session")(session),
      Product= require("./models/product"),
      SessionCart = require("./models/sessioncart"),
      Review = require("./models/review"),
      User = require("./models/user")
      seedDB = require("./seed"),
      app     = express();

var productRoutes = require("./routes/products"),
    reviewRoutes = require("./routes/reviews"),
    mainRoutes = require("./routes/index"),
    shoppingRoutes = require("./routes/shopping"),
    profileRoutes = require("./routes/profile");

mongoose.connect("mongodb://localhost/sample_shop");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// seedDB();

var store = new MongoDBStore({
  uri: "mongodb://localhost/sample_shop",
  collection: "sessions"
}, function(err){
  console.log(err);
})


app.use(session({ //creates new id everytime: MUST FIX
  secret: "The Cake is a Lie",
  resave: false,
  store: store,
  saveUninitialized: true,
  cookie: {secure: false}
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("trust proxy", 1);

//middleware for every request


app.use(function(req,res,next){
  console.log(req.user);
  res.locals.session = req.session;
  res.locals.currentUser = req.user;
  next();
})

app.use("/", mainRoutes);
app.use("/products", productRoutes);
app.use("/products/:id/reviews", reviewRoutes);
app.use("/profile", profileRoutes);
app.use(shoppingRoutes);


app.listen(process.env.PORT || 3000, function(){
  console.log("Shop server is running");
})
