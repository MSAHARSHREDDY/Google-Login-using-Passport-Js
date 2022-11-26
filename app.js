require("dotenv").config()
const express=require("express")
const {connectDB}=require("./db/connectDB")
const cookieSession=require("express-session")
const {router}=require("./routes/web")
const authRoutes=require("./routes/auth-routes")
const profileRotes=require("./routes/profile-routes")
const passportSetup=require("./config/passport-setup")
const passport=require("passport")
const app=express()

const port=process.env.port


//db
connectDB()

//engine
app.set("view engine","ejs")


// set up session cookies
app.use(cookieSession({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));
  
  // initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

//static
app.use(express.static('public'))

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use("/",router)
app.use("/profile",profileRotes)
app.use("/auth",authRoutes)

app.listen(port,()=>{
    console.log("listening on port "+port)
})