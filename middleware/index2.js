var Workplace = require("../models/workplace");
var Comment = require("../models/work-comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkWorkplaceOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Workplace.findById(req.params.id, function(err, foundWorkplace){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the workplace page?
            if(foundWorkplace.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;