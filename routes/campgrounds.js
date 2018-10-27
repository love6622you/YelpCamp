var express = require("express");
var router  = express.Router(); //用Router()建立一個Express的Router物件
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

//Index
router.get("/" , function(req , res){
    // console.log(req.user) 僅用來查看使用者資料
    // Get all campgrounds from DB
    Campground.find({} , function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index" , {campgrounds : allCampgrounds});
       }
    });
});

//Create - add new campground to DB
router.post("/" , middleware.isLoggedIn , function(req , res){ //第一個參數(/campgrounds) 與 form 裡的 action 參數相呼應
   //get data from form and add to campgrounds array
   var name = req.body.name; //取表單 name 的資料
   var price = req.body.price ; //同上
   var image = req.body.image; //同上
   var desc = req.body.description; //同上
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name , price: price , image: image , description: desc , author: author};
   //  campgrounds.push(newCampground);
   //  Create a new campground and save to DB
   Campground.create(newCampground , function(err , newlyCreated){
      if(err){
          console.log(err);
      } else {
          //redirect back to campgrounds page
          res.redirect("/campgrounds");
      }
   });
});

//New - show form to create new campground
router.get("/new" , middleware.isLoggedIn ,function(req , res){
   res.render("campgrounds/new"); 
});

//SHOW - show more info about one campground
router.get("/:id" , function(req , res){
   //find the campground with provided ID 
   Campground.findById(req.params.id).populate("comments").exec(function(err , foundCampground){ //找到其目標對象(id)後，將comments的內容populate(填充)
        if(err){
          console.log(err);
        } else {
          console.log(foundCampground);
          //render show template with that campground
          res.render("campgrounds/show" , {campground: foundCampground});
        }
   });
});


              

//Edit campground route
router.get("/:id/edit" , middleware.checkCampgroundOwnership , function(req ,res){
    Campground.findById(req.params.id , function(err , foundCampground){
        res.render("campgrounds/edit" , {campground: foundCampground});   
    });
});

//update campground route
router.put("/:id" , middleware.checkCampgroundOwnership ,function(req , res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id , req.body.campground , function(err , updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

router.delete("/:id" , middleware.checkCampgroundOwnership , function(req ,res){
    Campground.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    }) ;
});

module.exports = router;