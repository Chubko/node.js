const { O_AUTH } = require('../constant/database.Models.enum');
const db = require('../database').getInstance();

module.exports = {
    createTokens: (tokens, transaction) => {
        const O_Auth = db.getModel(O_AUTH);

        return O_Auth.create(tokens, { transaction });
    },

    findToken: (token) => {
        const O_Auth = db.getModel(O_AUTH);

        return O_Auth.findOne({ where: { access_token: token } });
    },

    checkUserExists: (userId) => {
        const O_Auth = db.getModel(O_AUTH);

        return O_Auth.findOne({ where: { user_id: userId } });
    },

    reIssueTokens: (tokens, userId, transaction) => {
        const O_Auth = db.getModel(O_AUTH);

        return O_Auth.update({ access_token: tokens.access_token, refresh_token: tokens.refresh_token }, {
            where: { user_id: userId },
            transaction
        });
    }
};
