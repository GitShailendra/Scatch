const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")

module.exports =async function isLoggedin(req,res,next) {
    if(!req.cookies.token){
        req.flash("error","you need to login first")
        return res.redirect("/")
    }
    try{
        let decode= jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user = await userModel.findOne({email:decode.email}).select("-password")
        req.user = user;
        next();

    }catch(err){
        req.flash("error","something went wrong")
        res.redirect("/")
    }

}