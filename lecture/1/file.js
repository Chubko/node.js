// const y = require('./app');
// const path = require('path');
// const fs = require('fs');
// const filePath = __dirname + '/file.txt';

// fs.writeFile(filePath, 'hello11111111', err=>{
//     if(err){
//         console.log(err);
//     }
// })
// fs.appendFile(filePath, '2222222222222222', err=>{
//     if(err){
//         console.log(err);
//     }
// })

// fs.mkdir(`${__dirname}/netflix/films/some`,{recursive: true}, err => {
//     if(err){
//         console.log(err);
//     }
// })
// fs.rmdir(`${__dirname}/netflix`,{recursive: true}, err => {
//     if(err){
//         console.log(err);
//     }
// })
// fs.readdir(__dirname, ((err, files) => {
//     if(err){
//         console.log('---------')
//         console.log(err);
//         console.log('---------')
//         return;
//     }
//     files.forEach(fileName=>{
//         fs.stat(__dirname + `/${fileName}`, ((err1, stats) => {
//             console.log(fileName, stats);
//             console.log(fileName,stats.isDirectory());
//             console.log(fileName,stats.isFile())
//         }))
//     })
// }))
// fs.unlink(__dirname+`/file.txt`, err => {
//     if(err){
//         console.log(err)
//     }
// })
// fs.rename(filePath, `${__dirname}/dir/file2.txt`, err => {
//     if(err){
//         console.log(err)
//     }
// })
// fs.rename(`${__dirname}/dir/file2.txt`,filePath, err => {
//     if(err){
//         console.log(err)
//     }
// })
// let newPath = path.join(__dirname,'dir', 'file.txt');
// console.log(newPath)
// let wrong = __dirname+'/dir/////////file.txt';
// let norm = path.normalize(wrong);
// console.log(norm)

// const readStream = fs.createReadStream(filePath);
// readStream.on('data', chunk=>{
//     console.log(chunk)
// })
// const  writeStream = fs.createWriteStream(filePath);
// for (let i = 0; i < 10000; i++) {
//     writeStream.write('hello world');

// }
// const readStream = fs.createReadStream(path.join(__dirname, 'dir', 'king.txt'));
// const  writeStream = fs.createWriteStream(path.join(__dirname, 'dir', 'data.txt'));
// readStream.on('data', chunk=>{
//     writeStream.write(chunk);
// })

