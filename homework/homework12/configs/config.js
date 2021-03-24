module.exports = {
    MONGO_URL: process.env.MONG0_URL || 'mongodb://localhost:27017/users',
    MYSQL_DB_NAME: process.env.MYSQL_DB_NAME || 'sept-2020',
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'root',
    PORT: process.env.PORT || 5000,
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'test@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '12345'
};
