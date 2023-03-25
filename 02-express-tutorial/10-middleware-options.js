const express = require('express')
const app = express()
const morgan = require('morgan')
const logger = require('./logger')
const authorize = require('./authorize')

//  req => middleware => res

//With middleware functions our options are:
//1. use vs route
//2. options- our own (res.send('') / express (logger using next()) /third party( morgan)

// app.use(express.static('./public'))

//using 3d party middleware functions (=reusable functions)-  with the gelp of MORGAN npm package app.use(morgan('tiny')) will return to console :method :url :status :res[content-length] - :response-time ms') for EVERY path user is requesting--->
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Home');
});
app.get('/about', (req, res) => {
  res.send('About');
});
app.get('/api/products', (req, res) => {
  res.send('Products');
});
app.get('/api/items', (req, res) => {
  console.log(req.user);
  res.send('Items');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
