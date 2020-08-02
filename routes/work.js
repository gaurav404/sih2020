var express = require("express");
var router  = express.Router();
// var Doctor = require("../models/doctor");
// var middleware = require("../middleware");


//INDEX - show all doctors


router.get("/", function(req, res){
    res.render("work");
});



module.exports = router;

