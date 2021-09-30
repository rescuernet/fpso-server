module.exports = whitelistSymbol = {
    whitelistEmail: {
        exp: /^[A-Za-z0-9-_@.]+$/,
        messageError: "Проверьте e-mail адрес. Разрешены только буквы латинского алфавита, цифры и символы: @ - _ . "
    },
    whitelistPass: {
        exp: /^[A-Za-z0-9-_@$!]+$/,
        messageError: "Проверьте пароль. Разрешены только буквы латинского алфавита, цифры и символы: @ $ ! - _ . "
    },
    passwordStrong: {
        option: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        },
        messageError: "Пароль не отвечает критериям: 1. не менее 8 символов; 2. обязательно (минимум) одна заглавная буква, 1 строчная буква, 1 цифра, 1 символ"
    }
}

