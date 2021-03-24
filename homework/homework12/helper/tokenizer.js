const jwt = require('jsonwebtoken');

const { secretWords } = require('../constant');

module.exports = (role) => {
    const { JWT_ACCESS_SECRET } = secretWords[role];
    const { JWT_REFRESH_SECRET } = secretWords[role];

    const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '10m' });
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
        access_token,
        refresh_token
    };
};
