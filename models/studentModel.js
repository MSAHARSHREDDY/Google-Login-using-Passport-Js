const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const studentSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    
            token:{type:String}
    
})




const studentModel=mongoose.model("student",studentSchema)
module.exports={studentModel}