const { passwordHasher, tokenizer } = require('../helper');
const { authService } = require('../service');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            await passwordHasher.compare(password, req.user.password);

            const tokens = tokenizer();

            await authService.createTokens({ ...tokens, _user_id: req.user.id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    refreshTokens: async (req, res, next) => {
        try {
            const { userToken } = req;

            const tokens = tokenizer();

            await authService.reIssueTokens(tokens, userToken._id);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
