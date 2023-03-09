const { readFile, writeFile }= require('fs').promises
// const util = require('util')
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)

// const getText= (path) => {
//     return new Promise((resolve, reject)=>{
//         readFile(path, 'utf8', (err, data)=>{
//             if (err){
//                 reject(err);
//             }
//             else {
//                 resolve(data)
//             }
//             })

//     })
// }

//1 version async syntax
const start = async () => {
    try {
        const first = await readFile('./content/first.txt', 'utf8');
        const second = await readFile('./content/second.txt', 'utf8');
        await writeFile('./content/result-mind-grenade.txt',
        `THiS IS wonderful
        
        
        : ${first}  ${second}`,
        {flag: 'a'})
        console.log(first, second)
    
    } catch(error) { 
        console.log(error);
    
    }
    }

//2 vesion promise syntax
// getText('./content/first.txt')
//     .then((result)=>console.log(result))
//     .catch((err)=> console.log(err))


start()

