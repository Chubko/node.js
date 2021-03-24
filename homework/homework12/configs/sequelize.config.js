const { MYSQL_DB_NAME, MYSQL_PASSWORD, MYSQL_USER } = require('./config');

module.exports = {
    development: {
        username: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DB_NAME,
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};
