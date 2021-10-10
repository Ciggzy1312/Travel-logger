const express = require("express")
const app = express()
const dbConnect = require('./db/db')

const userRoute = require("./routes/users")
const pinRoute = require("./routes/pins")


app.use(express.json())
dbConnect()

app.use("/api/users", userRoute)
app.use("/api/pins", pinRoute)

app.listen(5000,()=>{
    console.log("Server is running...")
})