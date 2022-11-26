const express=require("express")
const {studentModel}=require("../models/studentModel")
const { check, validationResult } = require('express-validator');
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const createToken=async(id)=>
{
    //sign method is used to sign jwt
    //Here "id" is payload
    //Here "malladisaharshreddy" is secret
    return jwt.sign({id},"malladisaharshreddy",{expiresIn:"24h"})
}

const signin_get=(req,res)=>
{
    res.render("signin.ejs")
}
const signin_post=async(req,res)=>
{
    try
    {
        var validations =[
            check('email').trim().notEmpty().withMessage(" email is required") ,
            check("password").notEmpty().withMessage("password filed is required")
        ]
        for (let validation of validations)
        {
        var result1 = await validation.run(req);
        if (result1.errors.length) break;
        }
    var errors = validationResult(req);
            if(errors.isEmpty())
            {

                const email=req.body.email
                const password=req.body.password
                const result=await studentModel.findOne({email:email})
                if(result!=null)
                {
                    const isMatch=await bcrypt.compare(password,result.password)
                    if(email===email && isMatch)
                    {
                        const token=await createToken(result._id)
                        console.log(token)
                        res.cookie("jwtoken",token,{httpOnly:true})
                        res.redirect("/")
                    }
                    else
                    {
                        res.send("please verify your email and password")
                    }
                }
                else
                {
                        res.send("You are not a registered user please go to signup page")
                }
            }
            else
            {
                res.send(errors)
                console.log(errors)
            }
    }
    catch(err)
    {
        console.log(err)
    }
}
module.exports={signin_get,signin_post}