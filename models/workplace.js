var mongoose = require("mongoose");

var workplaceSchema = new mongoose.Schema({
   name: String,
   image: String,
   accessibility:Number,
   inclusivity:Number,
   paygap:Number,
   maternityleave:Number,
   workplaceharassment:Number,
   healthcare:Number,
   casualsexism:String,
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

module.exports = mongoose.model("Workplace", workplaceSchema);