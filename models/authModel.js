const mongoose=require("mongoose")
const authSchema=new mongoose.Schema({
    name:{type:String},
    googleId:{type:String}
})
const authModel=mongoose.model("auth",authSchema)
module.exports={authModel}