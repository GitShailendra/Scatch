const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const path = require("path")
const expressSession = require("express-session")
const flash = require("connect-flash")
require("dotenv").config()
const index = require("./routes/index")
const ownerRouter = require("./routes/ownerRouter")
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productsRouter")
const db= require("./config/mongoose-connection")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret: "secret",
}))
app.use(flash())
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")

app.use("/",index);
app.use("/owners",ownerRouter)
app.use("/users",userRouter)
app.use("/products",productRouter)

app.listen(3000)