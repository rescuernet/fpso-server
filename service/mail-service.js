const nodeMailer = require('nodemailer');
const Const = require("../const-keys/const");

class MailService {

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: Const.SMTP_HOST,
            port: Const.SMTP_PORT,
            secure: false,
            auth: {
                user: Const.SMTP_USER,
                pass: Const.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: Const.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + Const.API_URL,
            text: '',
            html:
                `<div>
                   <h1>Для активации перейдите по ссылке</h1>
                   <a href="${link}">${link}</a>
                </div>`
        })
    }
}


module.exports = new MailService();