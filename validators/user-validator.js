const {body} = require('express-validator');
const {whitelistEmail,whitelistPass,passwordStrong} = require('./whitelist-symbol');


module.exports = UserValidator = [
    body('email')
        .isEmail().withMessage(whitelistEmail.messageError)
        .normalizeEmail({gmail_remove_dots:false})
        .matches(whitelistEmail.exp).withMessage(whitelistEmail.messageError),
    body('password',whitelistPass.messageError)
        .matches(whitelistPass.exp)
        .isStrongPassword(passwordStrong.option).withMessage(passwordStrong.messageError)
]
