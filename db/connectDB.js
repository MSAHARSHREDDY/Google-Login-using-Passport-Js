const mongoose=require("mongoose")
const connectDB=(req,res)=>
{
    try
    {
        mongoose.connect(process.env.uri,{
            dbName:process.env.dbName
        })
        console.log("db connected success")
    }
    catch(err)
    {
        console.log(err)
        res.send("failed to connect")
    }
}
module.exports={connectDB}