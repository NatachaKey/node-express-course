//example of exporting logger function (see 08-middleware-basic.js)

const logger = (req, res, next) =>{
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time);
    next()
    }

module.exports = logger