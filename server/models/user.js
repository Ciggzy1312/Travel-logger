const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            min : 6,
            max : 20,
            unique : true
        },

        email : {
            type : String,
            required : true,
            unique : true
        },

        password : {
            type : String,
            required : true,
            min : 8
        },
    },
    { timestamps : true }
)

module.exports = mongoose.model("user", userSchema)