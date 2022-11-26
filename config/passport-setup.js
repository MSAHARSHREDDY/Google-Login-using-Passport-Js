const passport=require("passport")
const GoogleStrategy=require("passport-google-oauth20")
const {authModel}=require("../models/authModel")
const jwt=require("jsonwebtoken")

/*
    Passport.serialize and passport.deserialize are used to set id as a cookie in. the user's browser and to get the id from the cookie when it then used to get user info in a callback. The. done() function is an internal function of passport.js and the user id which you provide as the second
*/
passport.serializeUser((user,done)=>{
    done(null,user.id)
    
})

passport.deserializeUser((id,done)=>{
    authModel.findById(id).then((user)=>{
        done(null,user)
    })
   
})




passport.use(new GoogleStrategy(
    {
        //options for google start
        callbackURL:"http://localhost:3000/auth/google/redirect",//This path is going to redirect to "auth-routes.js" file
        clientID:process.env.clientID,
        clientSecret:process.env.clientSecret
    },async(accessToken,refreshToken,profile,done)=>{
        
        console.log("passport callback")
        console.log(profile)
        //check if user already exists in our database
        const userData=await authModel.findOne({googleId:profile.id})
        if(userData)
        {
            //If already have the user
            //function creation
            const createToken=(id)=>
            {
            const token= jwt.sign({id},"malladisaharshreddy",{expiresIn:"24h"})  
            console.log(token)
            }
            createToken(profile.id)//function calling
         
            console.log("user is "+userData)
            done(null,userData)
        }
        else
        {
            //If user doesnot exists create new user and store in database
            const doc= await new authModel({
                name:profile.displayName,
                googleId:profile.id
            })
            const result=await doc.save()
            const createToken=(id)=>
            {
            const token= jwt.sign({id},"malladisaharshreddy",{expiresIn:"24h"})  
            console.log(token)
            }
            createToken(profile.id)//function calling
                //res.cookie("jwtoken",token,{httpOnly:true})
            console.log(result)
            done(null,result)
        }
        
    }
))
