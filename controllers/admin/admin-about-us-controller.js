const adminAboutUsService = require('../../service/admin/admin-about-us-service')
const Resize = require("../../function/Resize");
const FileUpload = require("../../function/file-cloud");


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
        if(req.file){
            try {
                await FileUpload.Upload(req.file.filename)
                return res.json({doc: req.file.filename});
            } catch (e) {
                next(e);
            }
        }else{
            return res.json({error: 'Ошибка загрузки'});
        }
    }

    async about_us_img_create(req, res, next) {
        if(req.file){
            try {
                const resize = new Resize();
                const filename = await resize.save(req.file,'inside',800,800,null,false);
                await resize.save(req.file,'cover',120,120,'crop_' + filename,true);
                return res.status(200).json({ name: filename });
            } catch (e) {
                next(e);
            }
        }else{
            return res.json({error: 'Ошибка загрузки'});
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