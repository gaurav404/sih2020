var mongoose = require("mongoose");

var doctorSchema = new mongoose.Schema({
   name: String,
   image: String,
   rating:Number,
   specialization:String,
   location :String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Doctor", doctorSchema);