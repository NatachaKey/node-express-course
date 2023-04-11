//check username, password in post(login) request (they will be available in req.body)
//if exists we create new JWT, if not- we send back error response to front end

//setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const {BadRequestError} = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;

  //mongoose validation
  //Joi package
  //check in the controllers

  if (!username || !password) {
    throw new BadRequestError('Please, provide username and password');
  }

  //just for demo, id is normally provided by DB
  const id = new Date().getDate();

  //don´t use password here, normally here we send back the id
  //try to keep payload small, better experience for user (for speed , good connection)
  //just for demo, in production use long, complex and unguessable string value!!!!!!!!!!!!!!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  //in .env JWT_SECRET= jwtSecret  this value is used to sign our tokens

  res.status(200).json({ msg: 'user created', token });
};

//authorized/secret data
const dashboard = async (req, res) => {

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
