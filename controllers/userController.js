const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = asyncHandler(async (req,res)=>{
    const {userName,email,password} = req.body;
    if(!userName || !email || !password){
        res.status(404);
        throw new Error("All fields are mandotary!");
    }
    const avaliableUser = await User.findOne({email});
    if(avaliableUser){
        res.status(404);
        throw new Error("User already exists");
    }
    const hashPassword = await bcrypt.hash(password,10);
    console.log(hashPassword);
    const user = await User.create({
        userName,
        email,
        password : hashPassword,
    })
    if(user){
        res.status(200).json({message:"user craeted succesfully"});

    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
})
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(404);
        throw new Error("All fields are mandotory!");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200);
        const accessToken = jwt.sign({
            user:{
                userName: user.userName,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN,
    {expiresIn:"1h"});
    res.json({accessToken});
    }else{
        res.status(401);
        throw new Error("incorrect email or Password");
    }

})

const currUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
})
module.exports = {registerUser,loginUser,currUser};