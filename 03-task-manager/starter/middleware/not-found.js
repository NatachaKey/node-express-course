//set up custom 404 response
const notFound = (req, res) => res.status(404).send('Route does not exist');

module.exports = notFound;
