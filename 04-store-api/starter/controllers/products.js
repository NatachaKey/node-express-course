const Product = require('../models/product');

//getAllProductsStatic  is just for experimentation.
const getAllProductsStatic = async (req, res) => {
  // const search = 'ab';
  // in mongo db docs: $regex Selects documents where values match a specified regular expression.
  //in this case if above we set const search = 'ab' it will return us all results with letters 'ab' in  name
  // name: { $regex: search, $options: 'i' },
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price')
    .limit(10)
    //skipping 1 item in our response
    .skip(1);
  //but if we need to get smth specific: const products = await Product.find({ featured: false }) <--we can add more and combine the coditions: for example: name:'wooden desk'

  //throw new Error('testing async errors package')

  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  //here we set up a condition, we will only look for featured caracteristic
  //we will only show the result if featured (or/and others) is/are passed as a query
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    //here we set up a new property to queryObject called .featured and if the value that user pass for featured in url =true we set it to true and only show results with featured:true, if not - we set it  to 'false' and only show results with festured:false
    queryObject.featured = featured === 'true' ? true : false;
  }

  //it will look for the value that user provided in the request, and it will look only amoung previous results (featured:true or featured: false) .
  //for example, if the query is featured=false and company=ikea there will be 6 results (hits)
  if (company) {
    queryObject.company = company;
  }

  //if the name exists we´ll use regex
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
    // or queryObject.name=name means if the name exists i ´ll go with my queryObject, and name property will be = to a name that user provides
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    //QUESTION 1 TO MY MENTOR: what does this line 55 means? where did it came from?
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    //if user passes numericFilters (initially it is a string), then i need to replace it with the value that mongoose understand
    //so i create a fn filters and pass the regular expression (1st parameter(regEx)) (2nd parameter- callback function)
    
    // in operatorMap[match] we get access to the value that user provides(match), it could be > , =, etc. and then callback translate in to the mongoose language($...)
    //so now we can get the result
    //QUESTION 2 TO MY MENTOR:`-${operatorMap[match]}-` what does this symbols (-)do in this case ?
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    //we can only use numericFilters with numeric values(price, rating)
    const options = ['price', 'rating'];

    //split method splits string into an array, in this case with ,
    //then we iterate the array (using .forEach methos) that we got after applying split method
    filters = filters.split(',').forEach((item) => {
      //every item of this array will consist of field, operator, value
      //QUESTION 3 TO MY MENTOR: item.split('-') what does this symbols (-)do in this case ?
      const [field, operator, value] = item.split('-');

      //if user asks for fields price or rating
      if (options.includes(field)) {
        // we will dynamically set up properties on queryObject in mongooose format, we convert string value to Number(). 
        queryObject[field] = { [operator]: Number(value) };
      }
    });

    //user friendly format of query
    console.log(filters);//price>40
    //mongoose format query
    console.log(numericFilters);//{ price: { '$gt': 40 }, rating: { '$gte': 4 } }
  }

  console.log(queryObject);
  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  //if fields exists we will split them up, join them back together
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }
  //if user doesnt pass page value, it will be 1, and we will pass
  const page = Number(req.query.page) || 1;
  //if user doesnt pass limit value, we will show 10 products
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  //we have 23 products, if i decide to limit my response to 7 products per page, we will get 4 pages (7 7 7 2)
  // if user will pass page value= 1, then we will skip 0 products: const skip = (page - 1) * limit=  (1-1)*limit= 0*limit=0, we will skip 0 products
  // if user will pass page value= 2, then we will skip 0 products: const skip = (page - 1) * limit=  (2-1)*limit= 1*limit=, we will skip  products

  const products = await result;
  //if in the query there is no featured caracteristic we will get all the products

  //console.log(req.query); //here goes key-value pair that user hardcoded in url: for example, { name: 'ana', featured: 'true' } if his get request (on the frontend/postman) was {{URL}}/products?name=ana&featured=true
  //we get access to query string parameters that user provides (=req.query)
  //const products = await Product.find(req.query)
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
