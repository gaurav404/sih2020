var mongoose = require("mongoose");
var Doctor = require("./models/doctor");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Dr N", 
        image: "https://images.freeimages.com/images/large-previews/94b/surgeon-3-1504757.jpg",
        specialization:"Heart",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Dr M", 
        image: "https://images.freeimages.com/images/large-previews/711/medical-doctor-1236694.jpg",
        specialization:"Bones",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Dr L", 
        image: "https://images.freeimages.com/images/large-previews/d71/dentist-at-work-1480817.jpg",
        specialization:"Dentist",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){
   //Remove all doctors
   Doctor.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed doctors!");
         //add a few doctors
        data.forEach(function(seed){
            Doctor.create(seed, function(err, doctor){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a doctor");
                    //create a comment
                    Comment.create(
                        {
                            text: "Great doctor",
                            author: "Indeed"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                doctor.comments.push(comment);
                                doctor.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
