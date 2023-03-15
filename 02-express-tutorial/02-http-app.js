const http = require('http');
const { readFileSync } = require('fs');

//get all files
const homePage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeImage = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');

const server = http.createServer((req, res) => {
   //if user visits our url we will serve him with data

   // console.log(req.method)
    const url = req.url;
    console.log(url);

  if (url === '/') {
    //this is the home page
    res.writeHead(200, { 'content-type': 'text/html' });
    // if we set the header ourselves, without express, and instead of text/html we write text/plain , the result wil literally be <h1>home page</h1>
    res.write(homePage); // here we are sending the body
    //console.log('user hit the server');
    res.end();
    //This method signals to the server that all of the response headers
    //and body have been sent; that server should consider this message complete. The method, response.end(),
    // MUST be called on each response.
  }
  //about page
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('<h1>About page</h1>'); // here we are sending the body
    res.end();
  }

  //styles
  else if (url === '/styles.css') {
    res.writeHead(200, { 'content-type': 'text/css' });
    res.write(homeStyles);
    res.end();
  }

  //logo/image
  else if (url === '/browser-app.js') {
    res.writeHead(200, { 'content-type': 'image/svg+xml' });
    res.write(homeImage);
    res.end();
  }

  //logic
  else if (url === '/logo.svg') {
    res.writeHead(200, { 'content-type': 'text/javascript' });
    res.write(homeLogic);
    res.end();
  }
  //404
  //the page u r trying to reach out doest exist on my server
  else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.write('<h1>page not found</h1>'); // here we are sending the body
    res.end();
  }
});

server.listen(5000);
