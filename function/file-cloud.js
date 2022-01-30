const EasyYandexS3 = require("easy-yandex-s3");
const uuid = require('uuid');
const path = require("path");
const fs = require('fs');
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

    DeleteFile (filename) {
        filename.map(async (i)=>{
            await this.EYS3.Remove('crop_' + i);
            await this.EYS3.Remove(i);
        })
        return 200
    }

    async DeleteLocalTmp (filename) {
        await fs.unlinkSync(path.resolve('static/tmp/', filename))
    }
}

module.exports = new Yandex();

