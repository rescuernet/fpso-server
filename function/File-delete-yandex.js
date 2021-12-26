const EasyYandexS3 = require("easy-yandex-s3");
const constKeys = require('../const-keys/const-keys')

class DeleteYandex {
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

    async DeleteFile (filename) {
        await this.EYS3.Remove(filename);
        await this.EYS3.Remove('crop_' + filename);
    }
}

module.exports = new DeleteYandex();

