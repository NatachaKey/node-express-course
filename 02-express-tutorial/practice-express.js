const express = require('express')
const app = express()
const consoleLog = require('./practice-middleware')

app.use(consoleLog)

app.get('/', (req, res) => {
    res.send('This is our home page')
  })
  app.get('/contacts', (req, res) => {
    res.send('Contact page')
  })
  app.get('/shop', (req, res) => {
    res.send('Visit our shop')
  })
  
  
  app.listen(3000, () => {
    console.log('Server is listening on port 3000....')
  })
  