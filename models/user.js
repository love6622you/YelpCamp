var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
   username: String,
   password: String
});

UserSchema.plugin(passportLocalMongoose); //認證前的前置作業，才能讓some methods to our user.

module.exports = mongoose.model("User" , UserSchema);