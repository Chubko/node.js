module.exports = class ErrorHandler extends Error {
    constructor(status, customCode, message = '') {
        super(message);
        this.status = status;
        this.customCode = customCode; // 4001, 40012 (субкоди помилок)

        Error.captureStackTrace(this, this.constructor); // показує де виникла помилка
    }
};
