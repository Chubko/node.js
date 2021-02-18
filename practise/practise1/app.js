// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// і розподілити ваших юзерів саме по відповідних папках
const fs = require('fs');
const path = require('path');
const users = [
    { name: 'olya', gender: 'female', age: 20 },
    { name: 'vasya', gender: 'male', age: 18 },
    { name: 'inna', gender: 'female', age: 40 },
    { name: 'kolya', gender: 'male', age: 19 },
    { name: 'igor', gender: 'male', age: 23 },
    { name: 'ilona', gender: 'female', age: 21 },
    { name: 'alina', gender: 'female', age: 15 },
    { name: 'nazar', gender: 'male', age: 25 }
 ];

// fs.mkdir(path.join(__dirname, 'manOlder20'), err => {
//     if(err){
//         console.log(err);
//     }
// })
// fs.mkdir(path.join(__dirname, 'manYounger20'), err => {
//     if(err){
//         console.log(err);
//     }
// })
// fs.mkdir(path.join(__dirname, 'womanOlder20'), err => {
//     if(err){
//         console.log(err);
//     }
// })
// fs.mkdir(path.join(__dirname, 'womanYounger20'), err => {
//     if(err){
//         console.log(err);
//     }
// })
const handleError = (err)=>{
    if(err){
        console.log(err);
    }
}
users.forEach(user => {
    const fileContent = JSON.stringify(user);
    if(user.gender === 'male' && user.age>20){
        fs.writeFile(path.join(__dirname, 'manOlder20', `${user.name}.txt`), fileContent, err => handleError(err));
    }
    if(user.gender === 'male' && user.age<20){
        fs.writeFile(path.join(__dirname, 'manYounger20', `${user.name}.txt`), fileContent, err => handleError(err));
    }
    if(user.gender === 'female' && user.age>20){
        fs.writeFile(path.join(__dirname, 'womanOlder20', `${user.name}.txt`), fileContent, err => handleError(err));
    }
    if(user.gender === 'female' && user.age<20){
        fs.writeFile(path.join(__dirname, 'womanYounger20', `${user.name}.txt`), fileContent, err => handleError(err));
    }
})
