const express = require("express")
const router = express.Router();

router.get("/",function(req,res){
    res.send("hey it's user fine")
})
module.exports = router;
