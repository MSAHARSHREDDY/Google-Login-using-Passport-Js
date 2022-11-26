const express=require("express")
const router=express.Router()
const passport=require("passport")


//auth logout
router.get("/logout",(req,res)=>{
    req.logout()
    res.redirect("/")
})

//auth with google
//passport.authenticate it is used for authentication. Here we are using "google" authentication
//"passport.authenticate" it is going to redirect to "passport-setup.js " file
router.get("/google",passport.authenticate("google",{
    scope:["profile"]//scope property tells passport what type of information you to retrieve.In this we are retrieving complete profile information
}))

//callback route for google redirect to
//"passport.authenticate" it is going to redirect to "passport-setup.js " file
router.get("/google/redirect",passport.authenticate("google"),(req,res)=>{
    console.log(req.user.username)
    res.redirect("/profile")
})

module.exports=router