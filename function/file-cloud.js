const EasyYandexS3 = require("easy-yandex-s3");
const uuid = require('uuid');
const path = require("path");
const constKeys = require('../const-keys/const-keys')

class Yandex {
    EYS3;
    constructor() {
        this.EYS3  = new EasyYandexS3({
            auth: {
                accessKeyId: constKeys.YANDEX.accessKeyId,
                secretAccessKey: constKeys.YANDEX.secretAccessKey,
            },
            Bucket: constKeys.YANDEX.BucketPublic,
            debug: false,
        });
    }

    async UploadFile (buffer,filename) {
        if(buffer.originalname){
            return await this.EYS3.Upload({
                buffer: buffer.buffer,
                name: uuid.v4() + '-' + Date.now() + buffer.originalname.slice(buffer.originalname.lastIndexOf("."))
            }, "/")
        }else{
            return await this.EYS3.Upload({
                path: path.resolve('static/tmp/', filename),
                name: filename
            }, "/")
        }
    }

    async DeleteFile (filename) {
        await this.EYS3.Remove(filename);
        await this.EYS3.Remove('crop_' + filename);
    }
}

module.exports = new Yandex();

