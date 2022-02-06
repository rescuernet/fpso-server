const adminNewsService = require('../../service/admin/admin-news-service');
const {validationResult} = require('express-validator');
const ApiError = require('../../exceptions/api-error');
const Resize = require("../../function/Resize");
const FileUpload = require("../../function/file-cloud");


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
        if(req.file){
            try {
                const resize = new Resize();
                const filename = await resize.save(req.file,'inside',300,300,null,true);
                return res.status(200).json({ name: filename });
            } catch (e) {
                next(e);
            }
        }else{
            return res.json({error: 'Ошибка загрузки'});
        }
    }

    async news__imageCreate(req, res, next) {
        if(req.file){
            try {
                const resize = new Resize();
                const filename = await resize.save(req.file,'inside',1000,1000,null,false);
                await resize.save(req.file,'cover',120,120,'crop_' + filename,true);
                return res.status(200).json({ name: filename });
            } catch (e) {
                next(e);
            }
        }else{
            return res.json({error: 'Ошибка загрузки'});
        }
    }

    async news__docsCreate(req, res, next) {
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