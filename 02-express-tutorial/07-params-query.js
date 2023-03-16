const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>');
});

app.get('/api/products', (req, res) => {
  //im being selective aboute what im sending back- i dont send description from data.js
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

// if we have thousands of products- we can use :productID or other name , it permits access any product existing in data.js
app.get('/api/products/:productID', (req, res) => {
  //console.log(req)
  //console.log(req.params)
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );

  if (!singleProduct) {
    return res.status(404).send('Product Does Not Exist');
  }

  // console.log(singleProduct)
  return res.json(singleProduct);
});

//for more complex links- http://localhost:5000/api/products/4/reviews/abc
//if we change products or reviews we will get an error
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params);
  res.send('hello world');
});

app.get('/api/v1/query', (req, res) => {
  //console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
      // if user provides search=3  http://localhost:5000/api/v1/query?search=e
      //he will get only items which name starts with e
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
    //if user provides limit=3 http://localhost:5000/api/v1/query?limit=3
    //he will get 3 items
  }

  //if user didnt provide search or limit (or write them with errors)- we will show him all the data
  //if user writes limit=abc (we cant convert to number) we will get empty array
  //if user writes search=w (there is no product which name starts with w )we will get empty array

  //BUT!!!! if there´s no match with data.js
  //if we dont want user to get an empty array if there is no match for his query- we can setup the following condition:
  if (sortedProducts.length < 1) {
    //1 option
    //res.status(200).send('no products matched your search');

    //2 option
    return res.status(200).json({ sucess: true, data: [] });
    //here we must use return because if we dont explicitly return js keeps reading the code
    // we will get an error in thw console because we cant send 2 responses in the same request
    //so we should add return
    //we can have only one response per request
  }

  return res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
