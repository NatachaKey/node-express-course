// add dynamically all the products to our database

require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')


//.deleteMany() deletes all the products we currently have in the data base
//then we dynamically add all the products we have in products.json
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('Success!!!');
        process.exit(0)      
     } catch(error) {
        console.log(error);
        process.exit(1)    
       } 
}

start()