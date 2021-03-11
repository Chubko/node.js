const { emailActionsEnum } = require('../constant');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome', // назва шаблону
        subject: 'Welcome on board!' // контент
    },

    [emailActionsEnum.USER_BLOCKED]: {
        templateName: 'blocked',
        subject: 'Your account was blocked!'
    },

    [emailActionsEnum.PASSWORD_CHANGED]: {
        templateName: 'password_changed',
        subject: 'Password was changed!'
    }
};
