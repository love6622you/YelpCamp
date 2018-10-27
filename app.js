var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    flash         = require("connect-flash"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds"); //從seeds.js中，獲得seedDB這個function

// requring routes
var commentRoutes     = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    indexRoutes        = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v12" , {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public")); //__dirname表示目前的工作區域 __dirname => /home/ubuntu/workspace/YelpCamp/v10 // public前面記得有底線!!!!!!!!!!!前提是有 __dirname的話
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //使用seedDB這模組的function //seed the database


// Passport Confituration
app.use(require("express-session")({
    secret: "Chia is a very good man",
    resave: false ,
    saveUninitialized: false
}));

app.use(passport.initialize()); // 將passport初始化
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //如果沒有UserSchema.plugin(passportLocalMongoose); 就得手動寫這項方法
passport.serializeUser(User.serializeUser()); //對User裡的資料(Collection)做序列化
passport.deserializeUser(User.deserializeUser()); //對User裡的資料(Collection)做反序列化


//{currentUser(ejs用): req.user(js)} 這是在render後的參數
//在這裡變成是讓每一個route都能被配置到這個參數
//comments.js會使用到(routes->comments.js)
app.use(function(req , res , next) {
   res.locals.currentUser = req.user; // Q: How we got req.user?  A:The req object comes from Express. req.user is created by Passport.
   res.locals.error = req.flash("error"); //讓每個template都能使用error這個變數
   res.locals.success = req.flash("success"); //讓每個template都能使用error這個變數
   next(); //如果沒有這行-> 造成stop
});

app.use("/" , indexRoutes);
app.use("/campgrounds" , campgroundsRoutes); //有關campgrounds全是以這為開頭，在campgrounds.js中，每個"/" = "/campgrounds"
app.use("/campgrounds/:id/comments" , commentRoutes); //原理同上

app.listen(process.env.PORT , process.env.IP , function(){
    console.log("The YelpCamp Server has started"); 
}); 
