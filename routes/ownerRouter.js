const express = require("express")
const router = express.Router();

router.get("/",function(req,res){
    res.send("hey it's owner fine")
})
module.exports = router;