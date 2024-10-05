const express = require("express")
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/",function(req,res){
    let err = req.flash("error")
    let success = req.flash("success")


    let admin = req.flash("unauthorized")
  
    res.render("index",{err,admin,success,loggin:false})
});
router.get("/shop",isLoggedin, async function(req,res){
   let products = await productModel.find()
   let success = req.flash("success")
    res.render("shop",{products,success});
})
router.get("/cart",isLoggedin, async function(req,res){
   res.render("cart")
})
router.get("/addtocart/:productId",isLoggedin, async function(req,res){
   let user = await userModel.findOne({email:req.user.email})
   user.cart.push(req.params.productId)
   await user.save();
   req.flash("success","Added to cart ")
   res.redirect("/shop")
   
})
router.get("/logout",isLoggedin,function(req,res){
    res.render("shop");
})

module.exports = router;