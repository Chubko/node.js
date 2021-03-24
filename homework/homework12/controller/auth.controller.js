const { transactionInstance } = require('../database').getInstance();
const { passwordHasher, tokenizer } = require('../helper');
const { authService } = require('../service');

module.exports = {
    authUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { body: { password }, user } = req;

            await passwordHasher.compare(password, user.password);

            const tokens = tokenizer(user.role);

            await authService.createTokens({ ...tokens, user_id: user.id }, transaction);

            await transaction.commit();

            res.json(tokens);
        } catch (e) {
            await transaction.rollback();

            next(e);
        }
    },

    refreshTokens: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { user: { id, role } } = req;

            const tokens = tokenizer(role);

            await authService.reIssueTokens(tokens, id, transaction);

            await transaction.commit();

            res.json(tokens);
        } catch (e) {
            await transaction.rollback();

            next(e);
        }
    }
};
