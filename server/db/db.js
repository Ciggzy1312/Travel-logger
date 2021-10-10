const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const dbConnect = () => {
        mongoose.connect(process.env.MONGO_URI, async(err)=>{
        if(err) throw err;
        console.log("Conncted to db...")
    }
)}

module.exports = dbConnect