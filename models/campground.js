var mongoose = require("mongoose");
//Schema Setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String ,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId ,
         ref: "User"
      } , 
      username: String
   } ,
   comments: [
       {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Comment"
       }
    ]
});

module.exports = mongoose.model("Campground" , campgroundSchema); //因為第一個參數為一個集合，所以之後建立collection的時候，會是Campgrounds
