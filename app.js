import {loginRouter} from "./routes/auth/login.js"  
import {registerRouter} from "./routes/auth/register.js"

const express = require("express")  //npm install express
const app = express()
const PORT = 5500

app.get("/", (req, res)=>{
    console.log("1")
    res.send({1: "HELLO"})
})

app.listen(PORT, (req, res)=>{
    console.log("Server listening on PORT", PORT);
})

