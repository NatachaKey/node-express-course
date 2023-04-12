const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
   return res.status(401).json({ message: 'unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { name } = decoded;
    req.user = { name };
    next();
  } catch (error) {
    res.status(401).json({ message: 'unauthorized' });
  }
};

module.exports = authenticationMiddleware;

//we take the 1st element of the string using the split() function
//and validate the token
//If the token is present and valid, the middleware gets the user’s name from the token payload, then it creates a hash with one key “name” and a value being the user’s name
// and we save it in req.user
//we call next() to pass control to the controller for the GET request
