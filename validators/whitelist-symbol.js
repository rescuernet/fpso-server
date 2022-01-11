module.exports = whitelistSymbol = {
    whitelistEmail: {
        exp: /^[A-Za-z0-9-_@.]+$/,
        messageError: "Не корректные данные"
    },
    whitelistPass: {
        exp: /^[A-Za-z0-9-_@$!]+$/,
        messageError: "Не корректные данные"
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

