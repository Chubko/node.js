module.exports = {
// BAD REQUEST
    BAD_REQUEST: {
        customCode: 4000,
        message: 'Bad request'
    },
    NOT_EXISTING_ID: {
        customCode: 4001,
        message: 'Id is not existing'
    },
    ID_NOT_VALID: {
        customCode: 4002,
        message: 'Id is invalid'
    },
    WRONG_EMAIL_OF_PASSWORD: {
        customCode: 4003,
        message: 'Wrong email or password!'
    },
    NO_TOKEN: {
        customCode: 4004,
        message: 'Token is required'
    },
    // UNAUTHORIZED
    NOT_VERIFIED_TOKEN: {
        customCode: 4011,
        message: 'Token is not verified'
    },
    NOT_VALID_TOKEN: {
        customCode: 4012,
        message: 'Token is not valid'
    },
    // NOT FOUND
    RECORD_NOT_FOUND: {
        customCode: 4041,
        message: 'Tokens are not found'
    }
};
