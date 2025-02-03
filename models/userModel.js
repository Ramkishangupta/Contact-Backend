const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Please add the user "],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"]
    },
    password:{
        type:String,
        required:[true,"Enter your Password"],
    },

},
{
    timestamps:true,
}
);

module.exports = mongoose.model("User",userSchema);