const jwt=require("jsonwebtoken");
const { studentModel } = require("../models/studentModel");
 const requireAuth=(req,res,next)=>
 {
    const token=req.cookies.jwtoken
    //checking token in present or not
    if(token)
    {
        //verify method is used to verify token
        jwt.verify(token,"malladisaharshreddy",(err,decodedToken)=>{
            if(err)
            {
                console.log(err.message)
                res.redirect("/signin")
            }
            else
            {
                console.log(decodedToken)
                next()
            }
        })
    }
    else
    {
        res.redirect("/signin")
    }
 }

 






//if user logged in
const checkUser=(req,res,next)=>
{
  const token=req.cookies.jwtoken
  if(token)
  {
    jwt.verify(token,"malladisaharshreddy",async(err,decodedToken)=>{
      if(err)
      {
        console.log(err.message)
        res.locals.username=null
        next()
      }
      else
      {

        console.log(decodedToken);
        let user=await studentModel.findById(decodedToken.id)
        res.locals.username=user
        next()
        
      }
    
    })
  }
  else
  {
    res.locals.username=null
    next()
  }
}




 module.exports={requireAuth,checkUser}