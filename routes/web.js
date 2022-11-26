const express=require("express")
const {home,logout,explore}=require("../controllers/homeController")
const {signin_get,signin_post}=require("../controllers/signinController")
const {signup_get,signup_post}=require("../controllers/signupController")
const {requireAuth, checkUser}=require("../middleware/authMiddleware")

const router=express.Router()


//cookie-parser parses cookies and populates req. cookies with objects bidden to cookie names
const cookieParser=require("cookie-parser")
router.use(cookieParser())

router.get("*",checkUser)

//home
router.get("/",home)
router.get("/logout",logout)
router.get("/explore",requireAuth,explore)
//signin
router.get("/signin",signin_get)
router.post("/signin",signin_post)

//signup
router.get("/signup",signup_get)
router.post("/signup",signup_post)









module.exports={router}