const jwt = require('jsonwebtoken');

//user inserts name, password making POST request
const logon = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password || name === '' || password === '') {
    return res
      .status(400)
      .json({
        message:
          'You should provide BOTH name AND password to get access to Secret Data',
      });
  }
  const token = jwt.sign({ name, password }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  res.status(200).json({ token} );

};
//user gets secret data making GET request
const hello = async (req, res) => {
  res.status(200).json({
    message: `What's up there, ${req.user.name}?`,
  });
};

module.exports = {
  logon,
  hello,
};
