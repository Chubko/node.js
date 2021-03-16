// const mysql2 = require('mysql2');
//
// // create the connection to database
// const connection = mysql2.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'june-2020'
// });
//
// module.exports = connection.promise(); // по дефолту connection на колбеках, потрібно промісифікувати
//
// sequelize
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize('june-2020', 'root', 'root', { dialect: 'mysql' }); // connection

        const models = {}; // тут будуть всі моделі
        const modelsPath = path.join(process.cwd(), 'dataBase', 'MySQL', 'models'); // шлях до моделей

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => { // отримує всі файли з деректорії з моделями
                files.forEach((file) => { // file = Student.js
                    const [model] = file.split('.'); // [Student, js] отримуєм назву моделі Student
                    // eslint-disable-next-line import/no-dynamic-require
                    const modelFile = require(path.join(modelsPath, model)); // ./DB/MySQL/models/Student

                    models[model] = modelFile(client);
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    };
})();
