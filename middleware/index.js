var Campground = require("../models/campground");
var Comment = require("../models/comment");

// All the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req , res , next){
    // is user logged in ?
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id , function(err , foundCampground){
            if(err) {
                req.flash("error" , "Campground not found");
                res.redirect("back");
            } else {
                // does user own the campground?
                // console.log(foundCampground.author.id); //是一個Object
                // console.log(req.user._id); //是String
                if(req.user._id.equals(foundCampground.author.id)) { //原是 foundCampground.author.id.equals(req.user._id)，但foundCampground.author.id如果是underfind，equals似乎會有問題
                    next();
                } else {
                    req.flash("error" , "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error" , "You need to be logged in to do that");
        res.redirect("back");
    }
}  ;

middlewareObj.checkCommentOwnership = function(req , res , next){
    // is user logged in ?
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id , function(err , foundComment){
            if(err) {
                res.redirect("back");
            } else {
                // does user own the comment?
                // console.log(foundCampground.author.id); //是一個Object
                // console.log(req.user._id); //是String
                if(req.user._id.equals(foundComment.author.id)) { //原是 foundCampground.author.id.equals(req.user._id)，但foundCampground.author.id如果是underfind，equals似乎會有問題
                    next();
                } else {
                    req.flash("error" , "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error" , "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error" , "You need to be logged in to do that!"); //是一個key , value 的型態
    res.redirect("/login");
};


module.exports = middlewareObj ;
