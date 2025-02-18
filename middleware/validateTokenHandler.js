const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.header.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorised");
            }
            req.user = decoded.user;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("User is not Authorised");
        }
    }
})
module.exports = validateToken;