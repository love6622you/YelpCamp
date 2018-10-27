var express = require("express");
var router  = express.Router(); 
var passport = require("passport");
var User = require("../models/user"); //因為目前在routes資料夾，../表示至上一層，所以這行 => 回到v9的目錄，進入到models資料夾，require user.js

//root route
router.get("/" , function(req , res){
    res.render("landing"); 
});

// =============
//  Auth Routes
// =============

router.get("/register" , function(req ,res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register" , function(req , res){
    var newUser = new User({username: req.body.username}); //req.body.username表單中class = username的欄位
    User.register(newUser , req.body.password , function(err , user){ //newUser(資料庫)中只儲存username的資料，不儲存password
       if(err){
           req.flash("error" , err.message);
           return res.render("register");
       }
       passport.authenticate("local")(req , res , function(){ //進行本地端認證
           req.flash("success" , "Welcome to YelpCamp" + user.username);
           res.redirect("/campgrounds");
       });
    });
});

//------------------------------------------------------------------------------

// show login form
router.get("/login" , function(req , res){
   res.render("login");
});

// handling login logic 
// 下面的post型態 = app.post("login" , middleware , callback)
// middleware 這行的部份，跟上面 passport.use(new LocalStrategy(User.authenticate())) 有關聯
router.post("/login" , passport.authenticate("local" ,
    {
       successRedirect: "/campgrounds",
       failureRedirect: "/login"
    }) , function(req ,res){
    
});

//------------------------------------------------------------------------------

// logout route
router.get("/logout" , function(req ,res){
   req.logout();
   req.flash("success" , "Logged you out!");
   res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;