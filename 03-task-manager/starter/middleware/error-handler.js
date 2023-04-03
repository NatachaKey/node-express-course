const { CustomAPIError } = require('../errors/custom-errors');
const errorHandlerMiddlware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(500).json({ msg: `Smth went wrong, try again later...` });
};

module.exports = errorHandlerMiddlware;
