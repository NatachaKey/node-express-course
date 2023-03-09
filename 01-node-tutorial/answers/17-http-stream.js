var http = require('http')
var fs = require('fs')

http
  .createServer(function (req, res) {
    
    //1
    // const text = fs.readFileSync('./content/big.txt', 'utf8')
    // res.end(text)

    //2
    const fileStream = fs.createReadStream('./content/big.txt', 'utf8')
    fileStream.on('open', () => {
        //pipe method pushes from the reas stream to the write stream
      fileStream.pipe(res)
    })
    fileStream.on('error', (err) => {
      res.end(err)
    })
  })
  .listen(5000)