const EasyYandexS3 = require("easy-yandex-s3");
const uuid = require('uuid');
const path = require("path");

class UploadYandex {
    EYS3;
    constructor() {
        this.EYS3  = new EasyYandexS3({
            auth: {
                accessKeyId: '9U-3r2bm48XZEm5O8aXZ',
                secretAccessKey: 'onmLZNU3ZiaEobJZlfD3AMipUjQjFtDQVXB-QRxT',
            },
            Bucket: "fpso-public",
            debug: false,
        });
    }

    async UploadFile (buffer,filename) {
        if(buffer.originalname){
            return await this.EYS3.Upload({
                buffer: buffer.buffer,
                name: 'fpso' + uuid.v4() + buffer.originalname.slice(buffer.originalname.lastIndexOf("."))
            }, "/")
        }else{
            return await this.EYS3.Upload({
                path: path.resolve('static/tmp/', filename),
                name: filename
            }, "/")
        }
    }
}

module.exports = new UploadYandex();

