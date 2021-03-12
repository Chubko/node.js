const { emailActions, statusCodes } = require('../constant');
const { attachmentDirBuilder, passwordHasher } = require('../helper');
const { userMessage } = require('../message');
const { emailService, userService } = require('../service');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { avatar, body: { email, password, prefLang = 'en' } } = req;

            const hashPassword = await passwordHasher.hash(password);

            const user = await userService.createUser({ ...req.body, password: hashPassword });

            if (avatar) {
                const { uploadPath } = attachmentDirBuilder(avatar, avatar.name, 'photos', user._id);

                await userService.updateUserById(user._id, { avatar: uploadPath });
            }

            await emailService.sendEmail(email, emailActions.USER_CREATED, { userEmail: email });

            res.status(statusCodes.CREATED).json(userMessage.CREATED[prefLang]);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    findUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { avatar, body: { email, password, prefLang = 'en' } } = req;

            const hashPassword = await passwordHasher.hash(password);

            const user = await userService.updateUserById(userId, { ...req.body, password: hashPassword });

            if (avatar) {
                const { uploadPath } = attachmentDirBuilder(avatar, avatar.name, 'photos', user._id);

                await userService.updateUserById(user._id, { avatar: uploadPath });
            }

            await emailService.sendEmail(email, emailActions.USER_CHANGED, { userEmail: email });

            res.json(userMessage.UPDATED[prefLang]);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { email } = req;

            await userService.deleteUserById(userId);

            await emailService.sendEmail(email, emailActions.USER_DELETED, { userEmail: email });

            res.status(statusCodes.DELETED).json(userMessage.DELETED);
        } catch (e) {
            next(e);
        }
    }
};
