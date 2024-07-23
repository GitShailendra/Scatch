const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const db= require("./config/mongoose-connection")
const path = require("path")
const ownerRouter = require("./routes/ownerRouter")
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productsRouter")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")

app.use("/owners",ownerRouter)
app.use("/users",userRouter)
app.use("/products",productRouter)


app.listen(3000)