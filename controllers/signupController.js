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

const signup_get=(req,res)=>
{
    res.render("signup.ejs")
}
const signup_post=async(req,res)=>
{
    try
    {
        var validations =[
            check('name').trim().notEmpty().withMessage(" name is required") ,
            check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('please enter valid email'),
            check('password').not().isEmpty().withMessage('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
            check('cpassword').not().isEmpty().withMessage('confirm Password is required') .custom((value,{req}) =>{
                if(value !== req.body.password)
                {
                    throw new Error('Password confirmation does not match with password')
                }
                else                                                     
                {
                    return true;             
                }
                /*----If u doesnot write else statement it return below error*/
                // {
                //     "errors": [
                //         {
                //             "value": "suresh123",
                //             "msg": "Invalid value",
                //             "param": "cpassword",
                //             "location": "body"
                //         }
                //     ]
                // }
            })
        ];
        for (let validation of validations)
         {
            var result1 = await validation.run(req);
            if (result1.errors.length) break;
        }
        var errors = validationResult(req);
        //validationResult
        //Extracts the validation errors from a request and makes them available in a Result object. Each error returned by . array() and . mapped() methods has the following format by default: { "msg": "The error message", "param": "param.
        if(errors.isEmpty())
        {
            const email=req.body.email
            const result=await studentModel.findOne({email:email})
            if(result)
            {
                res.send("email already exists")
            }
            else
            {
                const hashPassword=await bcrypt.hash(req.body.password,10)
                const doc=new studentModel({
                    name:req.body.name,
                    email:req.body.email,
                    password:hashPassword
                })
                const result=await doc.save()
                const token=await createToken(result._id)
                console.log(token)
                res.cookie("jwtoken",token,{httpOnly:true})
                 console.log(result)
                res.redirect("/signin")//If u give "res" only it stores cookie in website
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

module.exports={signup_get,signup_post}