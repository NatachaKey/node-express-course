const express = require('express');
const app = express();
const { products } = require('./data.js')

app.get('/', (req, res) => {
  res.json(products);
  //Sends a JSON response. This method sends a response (with the correct content-type)
  //that is the parameter converted to a JSON string using JSON.stringify().
});


app.listen(5000, () => {
  console.log('server is listening on port 5000...');
});
