const express=require("express")
const passport=require("passport")
const home=(req,res)=>
{
    res.render("home.ejs")
}

const logout=(req,res)=>
{
    res.cookie("jwtoken"," ")
   
    res.redirect("/")
}

const explore=(req,res)=>
{
    res.render("explore.ejs")
}

module.exports={home,logout,explore}