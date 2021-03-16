const { errorCodesEnum } = require('../constant');
// const errorMessage = require('../error/error.message');
const { userValidators } = require('../validator');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            //     const userId = +req.params.userId;
            //
            //     if(userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
            //         throw Error('Not valid Id');
            //     }

            next(); // для переходу до наступного обробника(в роутері перейти від middleware до controller)
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
