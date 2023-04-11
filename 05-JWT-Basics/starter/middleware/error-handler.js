const {CustomAPIError} = require('../errors')
const { StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later')
}

module.exports = errorHandlerMiddleware

//The instanceof operator tests to see if the prototype property 
//of a constructor appears anywhere in the prototype chain of an object. 
//The return value is a boolean value.