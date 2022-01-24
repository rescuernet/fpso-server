const adminAboutUsService = require('../../service/admin/admin-about-us-service')
const checkUpload = require("../../function/check-upload");
const Resize = require("../../function/Resize");
const Yandex = require("../../function/file-cloud");



class adminAboutUsController {

    async about_us_get(req, res, next) {
        try {
            const response = await adminAboutUsService.about_us_get();
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async about_us_docs_create(req, res, next) {
        const checkFile = checkUpload.checkUploadFile(req.file, 'docs')
        if(checkFile === 200){
            try {
                const uploadDocs = await Yandex.UploadFile(req.file)
                return res.json({doc: uploadDocs.key});
            } catch (e) {
                next(e);
            }
        }else{
            return res.status(401).json({error: 'Ошибка загрузки'});
        }
    }

    async about_us_img_create(req, res, next) {
        const checkFile = checkUpload.checkUploadFile(req.file, 'image')
        if(checkFile === 200){
            try {
                const fileUpload = new Resize();
                const filename = await fileUpload.save(req.file.buffer,'inside',800,800,null);
                const uploadDocs = await Yandex.UploadFile('',filename)
                const cropFileName = await fileUpload.save(req.file.buffer,'cover',120,120,'crop_' + filename);
                await Yandex.UploadFile('',cropFileName)
                return res.status(200).json({ name: uploadDocs.key });
            } catch (e) {
                next(e);
            }
        }else{
            return res.status(401).json({error: 'Ошибка загрузки'});
        }
    }

    async about_us_save(req, res, next) {
        try {
            const response = await adminAboutUsService.about_us_save(req.body);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new adminAboutUsController();