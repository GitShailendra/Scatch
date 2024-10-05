const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generateKey")
module.exports.registerUser = async function(req,res){
    try{
        let {fullname,email,password} = req.body

        let user  = await userModel.findOne({email:email})
        if(user) {
            req.flash("error","email exits use another email");
            return res.redirect("/")
        } 

        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt, async function(err,hash){
                if(err) return res.send(err.message)
                else{
                    const user=await userModel.create({
                        
                        fullname,
                        email,
                        password:hash,
                        
                    })
                    req.flash("success","user created you can login now");
                    let token = generateToken(user);
                    res.cookie("token",token)
                     return res.redirect("/")
                }
            })
        })
        
    }
    catch(err){
        console.log(err.message)

    }
}

module.exports.loginUser = async function (req,res){
    let {email,password} = req.body;
    let user = await userModel.findOne({email:email})
    if(!user) return res.send("email or password incorrect")
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token = generateToken(user);
            res.cookie("token",token)
            
            res.redirect("/shop");
        }else{
            req.flash("error","email or password incorrect")
            res.redirect("/")
        }
    })
}
module.exports.logout = async function(req,res){
    res.cookie("token","")
    res.redirect("/")
}