const { O_Auth, User } = require('../database/model');

module.exports = {
    createTokens: (tokens) => O_Auth.create(tokens),

    findUserByEmail: (email) => User.findOne(email),

    findToken: (token) => O_Auth.findOne(token).populate('_user_id'),

    checkUserExists: (userId) => O_Auth.findOne({ _user_id: userId.toString() }).sort({ createdAt: -1 }).limit(1),

    reIssueTokens: (tokens, userId) => O_Auth.findOneAndUpdate({ _id: userId },
        { $set: { access_token: tokens.access_token, refresh_token: tokens.refresh_token } })
};
