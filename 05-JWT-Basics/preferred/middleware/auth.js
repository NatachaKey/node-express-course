const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
     throw new UnauthenticatedError('No token provided')
   }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const { name } = decoded
    req.user = { name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('unauthorized')
  }
}

module.exports = authenticationMiddleware


// You will protect the GET request by a middleware authentication function. 
//This checks the Authentication header. 
//You get that by doing req.header(“Authorization”).
// This should be a string starting with “Bearer ” and followed by a string of gobbledygook. 
//You take the gobbledygook part of the string (use the split() function) and validate the token. 
//If the token is not present or not valid, you return a 401 (unauthorized) and a JSON object that has one attribute, 
//“message” with value “unauthorized”. (You don’t call next() in this case.) 
//If the token is present and valid, the middleware gets the user’s name from the token payload. 
//Then it creates a hash with one key “name” and a value being the user’s name, 
//and you save it in req.user. Then call next() to pass control to the controller 
//for the GET request.