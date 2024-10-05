const ownerModel = require("../models/owner-model")
module.exports = async function isAdmin(req,res,next){
    let admin = await ownerModel.find();
    if(admin.length>0){
        req.flash("unauthorized","you are not authorized for this route");
        return res.redirect("/")
    }
}