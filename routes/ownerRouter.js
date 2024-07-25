const express = require("express")
const router = express.Router();
const ownerModel = require("../models/owner-model");



if(process.env.NODE_ENV==="development"){
    router.post("/create", async function(req,res){
      //fullname 
      let owner =  await ownerModel.find();
      
      if(owner.length>0){
        console.log(owner)
        return res.status(504).send("you are not authorised user")
      }
        let {fullname,email,password} = req.body;
        let createOwner = ownerModel.create({
          fullname:fullname,
          email:email,
          password:password
        })
        res.status(500).send(createOwner);
      
    })
}
router.get("/admin",function(req,res){
  let success = req.flash("success")
  res.render("createproducts",{success})
})
module.exports = router;
