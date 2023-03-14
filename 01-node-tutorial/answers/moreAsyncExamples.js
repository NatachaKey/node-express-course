//started operating system process
// console.log('first')

// setTimeout(()=>{
//     console.log('second')
// }, 3000)

// console.log('third')
//completed and exited operating system process
//setTomeout is async ,callbacks will run last




//another expample:

// setInterval(()=>{
//     console.log('hello world')
// }, 2000)
// console.log('i will run first')

//process stays alive unless: kill process with control +c  or unexpected error


//another expample:
const http= require ('http')

const server = http.createServer((req, res)=>{
    console.log('request event')  
    res.end('Hello world')
})

server.listen(5000, ()=>{
    console.log('Server listening on port: 5000....')
    //listen is async , event loop is waiting for users request to come in 
})

console.log('')


