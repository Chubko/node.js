// Посортувати юзерів по папках.
// У вас є дві папки. 1800 та 2000. В кожній з цих папок є файлики аля
// Karina.txt, в якому міститься {"gender": "female"}
// Oleg.txt в якому міститься {"gender": "male"}
// Вам потрібно перемістити всіх дівчат на 1800 а хлопців на 2000.

const fs = require('fs');
const path = require('path');
const pathFemale = path.join(__dirname, '1800');
const pathMale = path.join(__dirname, '2000');

function handleError(err) {
    if (err) {
        console.log(`Error: ${err}`);
    }
}

const checkContent = (data, content) => data.toString().includes(content);

function sort(pathOld, pathNew, content) {
    fs.readdir(pathOld, (err, files) => {
        handleError(err);
        files.forEach(file => {
            fs.readFile(`${pathOld}/${file}`, (err, data) => {
                handleError(err)
                if (checkContent(data, content)) {
                    fs.rename(`${pathOld}/${file}`, `${pathNew}/${file}`, err => {
                        handleError(err)
                    });
                }
            })
        })
    })
}

function sortByGender(pathFemale, pathMale, contentFemale, contentMale) {
    sort(pathMale, pathFemale, contentFemale);
    sort(pathFemale, pathMale, contentMale);
}

sortByGender(pathFemale, pathMale, '"female"', '"male"');
