const adminNewsService = require('../../service/admin/admin-news-service');
const {validationResult} = require('express-validator');
const ApiError = require('../../exceptions/api-error');
const UploadYandex = require('../../function/File-upload-yandex')
const Resize = require("../../function/Resize");
const checkUpload = require("../../function/check-upload");



class adminNewsController {

    async news__create(req, res, next) {
        try {
            const newsData = await adminNewsService.news__create();
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

    async news__avatarCreate(req, res, next) {
        const checkFile = checkUpload.checkUploadFile(req.file, 'image')
        if(checkFile === 200){
            try {
                const fileUpload = new Resize();
                const filename = await fileUpload.save(req.file.buffer,'cover',200,200,null);
                const uploadDocs = await UploadYandex.UploadFile('',filename)
                return res.status(200).json({ name: uploadDocs.key });
            } catch (e) {
                next(e);
            }
        }else{
            return res.status(401).json({error: 'Ошибка загрузки'});
        }

    }

    async news__imageCreate(req, res, next) {
        const checkFile = checkUpload.checkUploadFile(req.file, 'image')
        if(checkFile === 200){
            try {
                const fileUpload = new Resize();
                const filename = await fileUpload.save(req.file.buffer,'inside',1000,1000,null);
                const uploadDocs = await UploadYandex.UploadFile('',filename)
                const cropFileName = await fileUpload.save(req.file.buffer,'cover',120,120,'crop_' + filename);
                await UploadYandex.UploadFile('',cropFileName)
                return res.status(200).json({ name: uploadDocs.key });
            } catch (e) {
                next(e);
            }
        }else{
            return res.status(401).json({error: 'Ошибка загрузки'});
        }
    }

    async news__docsCreate(req, res, next) {
        const checkFile = checkUpload.checkUploadFile(req.file, 'docs')
        if(checkFile === 200){
            try {
                const uploadDocs = await UploadYandex.UploadFile(req.file)
                return res.json({doc: uploadDocs.key});
            } catch (e) {
                next(e);
            }
        }else{
            return res.status(401).json({error: 'Ошибка загрузки'});
        }
    }

    async news__update(req, res, next) {
        try {
            const newsData = await adminNewsService.news__update(req.body);
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

    async news__delete(req, res, next) {
        try {
            const newsData = await adminNewsService.news__delete(req.body.id);
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

    async getNews(req, res, next) {
        try {
            const newsData = await adminNewsService.getNews();
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

    async getNewsId(req, res, next) {
        try {
            const newsData = await adminNewsService.getNewsId(req.params.id);
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new adminNewsController();