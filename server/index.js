const express = require("express")
const app = express()
const dbConnect = require('./db/db')

app.use(express.json())
dbConnect()

app.listen(5000,()=>{
    console.log("Server is running...")
})