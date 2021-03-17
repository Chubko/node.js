const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const { MYSQL_DB_NAME, MYSQL_PASSWORD, MYSQL_USER } = require('../../configs/config');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize(MYSQL_DB_NAME, MYSQL_USER, MYSQL_PASSWORD, { dialect: 'mysql' });

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'MySQL', 'models');

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    // eslint-disable-next-line import/no-dynamic-require
                    const modelFile = require(path.join(modelsPath, model));

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
