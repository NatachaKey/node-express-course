const  {readFile, writeFile} = require('fs')

console.log('start')
readFile('./content/first.txt', 'utf8', (err, result)=>{
    if (err){
        console.log(err)
        return
    }
    const first =result;
    readFile('./content/second.txt', 'utf8', (err, result)=>{

    if (err){
        console.log(err)
        return
    }
    const second =result;
    writeFile(
        './content/result-async.txt',
        `Second file - here it goes. This is my result: ${first}, ${second}`
        ,(err, result)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('done with this task')
        //console.log(result)
    })
    })
})    
console.log('starting next task')





//we run a callback function when we´re done/ when the functionality we´re doing is complete, we run the callback 