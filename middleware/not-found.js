const { StatusCodes } = require("http-status-codes")

const notFound  = (req , res ) => {
    res.statusCode(StatusCodes.NOT_FOUND).send('Route does not exists')
}

module.exports = notFound