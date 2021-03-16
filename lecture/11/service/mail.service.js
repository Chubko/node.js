const nodeMailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD } = require('../config/config');
const templatesInfo = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates') // шлях, де лежать вюшки
    }
});

const transporter = nodeMailer.createTransport({ // конфігурація для відправки email
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendEmail = async (userMail, action, context) => { // context - імя користувача, яке буде підставлятись в шаблон
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new Error('Wrong email action');
        }

        const html = await templateParser.render(templateInfo.templateName, context);

        return transporter.sendMail({
            from: 'NO REPLY',
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendEmail
};
