const express = require('express');
const app = express();

// Middleware function
const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
}

// Use middleware function
app.use(logger);

// Route handler
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
