const { dirNames: { PHOTOS, USER }, emailActions, statusCodes } = require('../constant');
const { transactionInstance } = require('../database').getInstance();
const { attachmentDirBuilder, passwordHasher } = require('../helper');
const { userMessage } = require('../message');
const { emailService, fileService, userService } = require('../service');

module.exports = {
    createUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { avatar, body: { email, password } } = req;

            const hashPassword = await passwordHasher.hash(password);

            const user = await userService.createUser({ ...req.body, password: hashPassword }, transaction);

            if (avatar) {
                const { uploadPath } = await attachmentDirBuilder(avatar, PHOTOS, user.id, USER);

                await userService.updateUserById(user.id, { avatar: uploadPath }, transaction);
            }

            await emailService.sendEmail(email, emailActions.USER_CREATED, { userEmail: email });

            await transaction.commit();

            res.status(statusCodes.CREATED).json(user);
        } catch (e) {
            await transaction.rollback();

            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    findUserById: (req, res, next) => {
        try {
            const { user } = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                avatar, body, body: { email, password, prefLang = 'en' }, params: { userId }
            } = req;

            if (password) {
                const hashPassword = await passwordHasher.hash(password);
                await userService.updateUserById(userId, { ...req.body, password: hashPassword }, transaction);
            }

            if (avatar) {
                await fileService.deleteFile(USER, userId);

                const { uploadPath } = await attachmentDirBuilder(avatar, PHOTOS, userId, USER);

                await userService.updateUserById(userId, { avatar: uploadPath }, transaction);
            }

            await userService.updateUserById(userId, body, transaction);

            await emailService.sendEmail(email, emailActions.USER_CHANGED, { userEmail: email });

            await transaction.commit();

            res.json(userMessage.UPDATED[prefLang]);
        } catch (e) {
            await transaction.rollback();

            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { user: { id, email } } = req;

            await userService.deleteUserById(id, transaction);

            await fileService.deleteFile(USER, id);

            await emailService.sendEmail(email, emailActions.USER_DELETED, { userEmail: email });

            await transaction.commit();

            res.status(statusCodes.DELETED).json(userMessage.DELETED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
