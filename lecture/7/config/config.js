module.exports = {
    MONGO_URL: process.env.MONG0_URL || 'mongodb://localhost:27017/test',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
    PORT: 5000
};