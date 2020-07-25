var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Doctor  = require("./models/doctor"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    doctorRoutes = require("./routes/doctors"),
    indexRoutes      = require("./routes/index")
    
// mongoose.connect("mongodb://localhost/dct1");
// mongoose.connect("mongodb://laba:arogya201829@ds137740.mlab.com:37740/arogya01");
console.log(process.env.DATABASEURL);
var url = process.env.DATABASEURL || "mongodb://Gaurav:hello%40123@ds143744.mlab.com:43744/shoplist";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB(); //seed the database , This basically means we are putting our own data every time server runs

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Hello Indeed",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // local strategy means just an username and password

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use("/", indexRoutes);
app.use("/doctors", doctorRoutes);
app.use("/doctors/:id/comments", commentRoutes);

// if you are on windows , you'll get the website on http://localhost:8889/
app.listen(8889, process.env.IP, function(){
   console.log("The Arogya Server Has Started!");
});




// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The Arogya Server Has Started!");
// });