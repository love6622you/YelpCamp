var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest" ,
        image: "https://goo.gl/KspZrw" ,
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Praesent in mauris eu tortor porttitor accumsan. Duis condimentum augue id magna semper rutrum. Sed convallis magna eu sem. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Fusce consectetuer risus a nunc. Nunc auctor. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Nulla pulvinar eleifend sem. Nulla quis diam. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Pellentesque arcu. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Curabitur vitae diam non enim vestibulum interdum."
    } ,
    
    {
        name: "Second Campground" ,
        image: "https://goo.gl/xq9dT3" ,
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Praesent in mauris eu tortor porttitor accumsan. Duis condimentum augue id magna semper rutrum. Sed convallis magna eu sem. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Fusce consectetuer risus a nunc. Nunc auctor. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Nulla pulvinar eleifend sem. Nulla quis diam. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Pellentesque arcu. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Curabitur vitae diam non enim vestibulum interdum."
    } ,
    
    {
        name: "Third campgrounds" ,
        image: "https://www.appletonmn.com/vertical/Sites/%7B4405B7C1-A469-4999-9BC5-EC3962355392%7D/uploads/campground_(2).jpg" ,
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Praesent in mauris eu tortor porttitor accumsan. Duis condimentum augue id magna semper rutrum. Sed convallis magna eu sem. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Fusce consectetuer risus a nunc. Nunc auctor. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Nulla pulvinar eleifend sem. Nulla quis diam. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Pellentesque arcu. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Curabitur vitae diam non enim vestibulum interdum."
    } 
];

function seedDB() {
    //remove第一個參數沒特別指定參數->all datas are removed
    Campground.remove({} , function(err) { 
        if(err) {
            console.log(err);
        } else {
            console.log("removed campgrounds");    
            //add a few campgrounds
            data.forEach(function(seed){ //把data的資料用forEach依序create
                Campground.create(seed , function(err , campground){ //將seed的三筆資料，create至campground中
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Add a campground");
                       
                        //add a few comments
                        Comment.create(
                            {
                                text: "This place is great , but I wish there was internet",
                                author: "Homer"
                        } , function(err , comment){
                            if(err){
                                console.log(err);
                            } else {
                                //camprgound尚未與comments產生關聯時，push會產生錯誤
                                campground.comments.push(comment); //將comment的資料push到campground
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                }) ;
            });
        }
    });  
}

module.exports = seedDB; //等於把 seedDB 這個function包成一個module，並在app.js上做使用