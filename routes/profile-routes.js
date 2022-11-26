const router=require("express").Router()


  router.get("/",(req,res)=>{
   //res.render("profile.ejs",{"title":"profile"},{userData:req.user})
   res.render("profile.ejs",{username:req.user})
  })
  module.exports = router;