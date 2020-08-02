var express = require("express");
var router  = express.Router({mergeParams: true});
var Work = require("../models/workplace");
var Comment = require("../models/work-comment");
var middleware = require("../middleware/index2");

//Comments New
router.get("/new2",middleware.isLoggedIn, function(req, res){
    // find doctor by id
    console.log(req.params.id);
    Work.findById(req.params.id, function(err, work){
        if(err){
            console.log(err);
        } else {
            console.log(work);
             res.render("workcomments/new", {workplace: work});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup work using ID
   Work.findById(req.params.id, function(err, work){
       if(err){
           console.log(err);
           res.redirect("/workplaces");
       } else {
        Comment.create(req.body.comment, function(err, comment){
            console.log(comment)
           if(err){
               console.log(err);
               res.redirect('/workplaces/' + work._id);
           } else {              
                
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               work.comments.push(comment._id);
               work.save();
               console.log(comment);
               res.redirect('/workplaces/' + work._id);
           }
        });
       }
   });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit2", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("workcomments/edit", {work_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/workplaces/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/workplaces/" + req.params.id);
       }
    });
});

module.exports = router;