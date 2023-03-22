const express = require('express')
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')

//  req => middleware => res

//we can pass two o more middleware functions  in array (the order is important- the will be executed in this order) ( in this case logger and authorize)-
app.use([authorize, logger])

//app.use(authorize)


app.get('/', (req, res) => {
  res.send('Home')
})
app.get('/about', (req, res) => {
  res.send('About')
})
app.get('/api/products', (req, res) => {
  res.send('Products')
})
//if i only want to check for authorized users in /api/items: I will include middleware function authorize
app.get('/api/items', authorize, (req, res) => {
  console.log(req.user)
  res.send('Items')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
