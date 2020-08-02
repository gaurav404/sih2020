var express = require("express");
var router  = express.Router();
var Workplace = require("../models/workplace");
var middleware = require("../middleware");


//INDEX - show all workplaces


router.get("/", function(req, res){
    res.render("workplaces");
});


router.get("/search", function(req, res){

  console.log(" here we are at workkkkkkkkkkkkkk");


    var nomatch = null;

    var search = req.query.search;
    console.log("req search = " +  req.query.search);

      if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
         Workplace.find({name:regex}, function(err, allWorkplaces){
         if(err){
           console.log(err);
         } else {
           
           if(allWorkplaces.length <1){
               nomatch = " no match yo ";
           }


          res.render("workplaces/index2",{workplaces:allWorkplaces,noMatch :nomatch});
         }
       });
        
      }else{

      Workplace.find({}, function(err, allWorkplaces){


      console.log(" show all of the workplaces");
       if(err){
           console.log(err);
       } else {
           res.render("workplaces/index2",{workplaces:allWorkplaces,noMatch :nomatch});
       }
    });


      }

   
    
    
    
    
});














//CREATE - add new workplace to DB
router.post("/", middleware.isLoggedIn, function(req, res){








  console.log("----------------");

    console.log(req);

  
    // get data from form and add to workplaces array

    var name = req.body.name;
    var image = req.body.image;




   var accessibility = req.body.accessibility;
   var inclusivity = req.body.inclusivity;
   var paygap = req.body.paygap;
   var maternityleave = req.body.maternityleave;
   var workplaceharassment = req.body.workplaceharassment;
   var healthcare = req.body.healthcare;
   var casualsexism = req.body.casualsexism;


    var location = req.body.location;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newWorkplace = {name: name, image: image, accessibility:accessibility,inclusivity:inclusivity,paygap:paygap,maternityleave:maternityleave,workplaceharassment:workplaceharassment,healthcare:healthcare,casualsexism:casualsexism,description: desc, author:author,location:location}
    // Create a new workplace and save to DB
    Workplace.create(newWorkplace, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to workplaces page
            console.log(newlyCreated);
            res.redirect("/workplaces?search=&searchby=workplaces");
        }
    });
});

//NEW - show form to create new workplace
router.get("/new2", middleware.isLoggedIn, function(req, res){
   res.render("workplaces/new2"); 
});

// SHOW - shows more info about one workplace
router.get("/:id", function(req, res){
    //find the workplace with provided ID
    Workplace.findById(req.params.id).populate("comments").exec(function(err, foundWorkplace){
        if(err){
            console.log(err);
        } else {
            console.log(foundWorkplace)
            //render show template with that workplace
            res.render("workplaces/show2", {workplace: foundWorkplace});
        }
    });
});

// EDIT DOCTOR ROUTE
// router.get("/:id/edit2", middleware.checkWorkplaceOwnership, function(req, res){
//     Workplace.findById(req.params.id, function(err, foundWorkplace){
//         if(err){
//           res.redirect("/workplaces");  
//         }else {
//                 res.render("workplaces/edit2", {workplace: foundWorkplace});
//         }
//     });
// });

// UPDATE DOCTOR ROUTE
// router.put("/:id",middleware.checkWorkplaceOwnership, function(req, res){
//     // find and update the correct workplace
//     Workplace.findByIdAndUpdate(req.params.id, req.body.workplace, function(err, updatedWorkplace){
//        if(err){
//            res.redirect("/workplaces");
//        } else {
//            //redirect somewhere(show page)
//            res.redirect("/workplaces/" + req.params.id);
//        }
//     });
// });

// DESTROY DOCTOR ROUTE
// router.delete("/:id",middleware.checkWorkplaceOwnership, function(req, res){
//    Workplace.findByIdAndRemove(req.params.id, function(err){
//       if(err){
//           res.redirect("/workplaces");
//       } else {
//           res.redirect("/workplaces");
//       }
//    });
// });

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;

