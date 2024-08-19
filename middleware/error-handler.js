const { StatusCodes } = require("http-status-codes")
const { CustomAPIError } = require("../errors")

const errorHandlerMiddleware = (err , req ,res , next) => {
    console.log(err);

    let customError = {
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message || 'Something went wrong , try again later'
    }
    
    if(err instanceof CustomAPIError){
        res.status(err.statusCode).json({msg : err.message})
    }


    if(err.code || err.code === '11000'){
        customError.statusCode = 400 , 
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field , please choose another value`
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
    return res.status(customError.statusCode).json({msg : customError.msg})
}

module.exports = errorHandlerMiddleware