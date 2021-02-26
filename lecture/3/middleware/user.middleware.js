const errorCode = require('../constant/errorCodes.enum');
const errorMessage = require('../error/error.message');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;

            if(userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw Error('Not valid Id');
            }

            next(); // для переходу до наступного обробника(в роутері перейти від middleware до controller)

        } catch (e) {
           res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const { name, password, preferLang = 'en'} = req.body;

            if (!name || !password) { // якщо немає якогось поля
                throw Error('Some field is empty');
            }

            if (password.length < 6) { //якщо пароль недостатньої довжини
                throw Error(errorMessage.TOO_WEAK_PASSWORD[preferLang]); // [preferLang] якою мовою відобразити повідомлення
            }

            next();
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    }
}
