module.exports = {
    MONGO_URL: process.env.MONG0_URL || 'mongodb://localhost:27017/test',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
    PORT: 5000,
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'test@gmail.com', // email, з якого буде відправка
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '12345'
};
