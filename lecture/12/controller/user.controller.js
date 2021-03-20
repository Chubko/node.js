const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1; // для генерування унікальних назв файлів

const { emailActionsEnum } = require('../constant');
const { emailService, userService } = require('../service');
const { passwordHasher } = require('../helper');

module.exports = {
    createUser: async (req, res) => {
        try {
            const { avatar, body: { email, password } } = req;

            const hashPassword = await passwordHasher.hash(password); // створення хеш пароля

            const user = await userService.createUser({ ...req.body, password: hashPassword }); // в БД юзер записується з хешованим паролем

            if (avatar) {
                // const pathWithoutStatic = path.join('user', `${user._id}`, 'photos');
                // const photoDir = path.join(process.cwd(), pathWithoutStatic);
                // const fileExtension = avatar.name.split('.').pop(); // отримуєм останній елемент масиву(розширення файлу)
                // const photoName = `${uuid()}.${fileExtension}`; // генерування унік назви файлу
                // const finalPhotoPath = path.join(photoDir, photoName);
                const { finalPhotoPath, photoDir, uploadPath } = _photoDirBuilder(avatar.name, 'photos', user._id);

                await fs.mkdir(photoDir, { recursive: true }); // створення директорії
                await avatar.mv(finalPhotoPath); // загрузка файлу

                await userService.updateUserById(user._id, { avatar: uploadPath });
            }

            await emailService.sendEmail(email, emailActionsEnum.WELCOME, { userName: email });

            res.status(201).json('User is created!'); // статус 201 - створено
        } catch (e) {
            res.json(e.message);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findAllUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        const { userId } = req.params;
        const user = await userService.findUserById(userId);

        res.json(user);
    },

    deleteUser: (req, res) => {
        try {
            const { userId } = req.params;

            if (userId !== req.user._id.toString()) { // req.user._id прокидується з middleware
                throw new Error('Unauthorized');
            }

            console.log(req.user);

            res.json(`${userId} is deleted`);
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};

function _photoDirBuilder(docName, itemType, itemId) {
    const pathWithoutStatic = path.join('user', `${itemId}`, itemType);
    const photoDir = path.join(process.cwd(), pathWithoutStatic);
    const fileExtension = docName.name.split('.').pop(); // отримуєм останній елемент масиву(розширення файлу)
    const photoName = `${uuid()}.${fileExtension}`; // генерування унік назви файлу
    const finalPhotoPath = path.join(photoDir, photoName);
    const uploadPath = path.join(pathWithoutStatic, photoName);

    return { finalPhotoPath, photoDir, uploadPath };
}
