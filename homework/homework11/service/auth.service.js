const { O_AUTH } = require('../constant/database.Models.enum');
const db = require('../database').getInstance();

module.exports = {
    createTokens: (tokens) => {
        const O_Auth = db.getModel(O_AUTH);

        return O_Auth.create(tokens);
    },

    findToken: (token) => {
        const O_Auth = db.getModel(O_AUTH);

        return O_Auth.findOne({ where: { token } });
    },

    checkUserExists: (userId) => {
        const O_Auth = db.getModel(O_AUTH);

        return O_Auth.findOne({ user_id: userId });
    },

    reIssueTokens: (tokens, userId) => {
        const O_Auth = db.getModel(O_AUTH);

        return O_Auth.update({ access_token: tokens.access_token, refresh_token: tokens.refresh_token }, { user_id: userId });
    }
};
