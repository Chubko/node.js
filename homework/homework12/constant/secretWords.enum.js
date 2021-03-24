module.exports = {
    admin: {
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET_ADMIN || 'ACCESS_SECRET_ADMIN',
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET_ADMIN || 'REFRESH_SECRET_ADMIN'
    },
    user: {
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'ACCESS_SECRET',
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET'
    }
};
