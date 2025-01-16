const constants = require('../contants');
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode:500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                tittle:"Validation error",
                message:err.message,
                stackTrace:err.stack
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                tittle:"unauthorised error",
                message:err.message,
                stackTrace:err.stack
            })
            break;    
        case constants.FORBIDDEN:
            res.json({
                tittle:"forbidden error",
                message:err.message,
                stackTrace:err.stack
            })
            break;    
        case constants.NOT_FOUND:
            res.json({
                tittle:"not found",
                message:err.message,
                stackTrace:err.stack
            })
            break;  
        case constants.SERVER_ERROR:
            res.json({
                tittle:"Server Error",
                message:err.message,
                stackTrace:err.stack
            })
            break;    
        default:
            console.log("No errors all Good!");    
            break;             

    }
    res.json({tittle:"Not Found", message: err.message ,stackTrace : err.stack});
    res.json({tittle:"Validation", message: err.message ,stackTrace : err.stack});
}

module.exports ={errorHandler};