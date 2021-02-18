// * вам потрбіно перемісти всі файлики з вкладених папок в іншу папку.
// Зробити всі файли на одному рівні вкладеності.

const fs = require('fs');
const path = require('path');

function handleError(err) {
    if (err) {
        console.log(`Error: ${err}`);
    }
}
fs.mkdir(`${__dirname}/1/2/3/4`, {recursive: true}, err => handleError(err));
fs.mkdir(`${__dirname}/1/5/6`, {recursive: true}, err => handleError(err));

fs.writeFile(`${__dirname}/1/2/file1.txt`,'file1', err => handleError(err));
fs.writeFile(`${__dirname}/1/5/6/file2.txt`,'file2', err => handleError(err));
fs.writeFile(`${__dirname}/1/2/3/file3.txt`,'file3', err => handleError(err));

function flattenDirectory(startPath, newPath) {
    fs.readdir(startPath, ((err, files) => {
        handleError(err);
        files.forEach(file => {
            const currentPath = path.join(startPath, `${file}`);
            fs.stat(currentPath, (err, stats) => {
                handleError(err);
                if (stats.isDirectory()) {
                    flattenDirectory(currentPath, newPath);
                } else {
                    fs.rename(currentPath, path.join(newPath, `${file}`), err => handleError(err));
                }
            })
        })
    }))
}
flattenDirectory(__dirname, __dirname);
