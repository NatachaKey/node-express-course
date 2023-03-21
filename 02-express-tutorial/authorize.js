const authorize = (req, res, next) => {
    
    // const { user } = req.query;
    // if (user === 'john') {
    //   req.user = { name: 'john', id: 3 };
    // //if this condition is met we go to next()-->

    //   next();
    // } else {
    //   res.status(401).send('Unauthorized');
    // }
    // it will work id we provide data: user:'john in url: http://localhost:5000/?user=john
    //otherwise there will be an error 401 and 'Unauthorized'
  console.log('authorize');
  next();
};

module.exports = authorize;
