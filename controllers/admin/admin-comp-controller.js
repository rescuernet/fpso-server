const adminCompService = require('../../service/admin/admin-comp-service');
const adminReferenceBooksService = require('../../service/admin/admin-reference-books-service');
const {validationResult} = require('express-validator');
const ApiError = require('../../exceptions/api-error');
const Resize = require("../../function/Resize");
const FileUpload = require("../../function/file-cloud");


class adminCompController {

    async compCreate(req, res, next) {
        try {
            const data = await adminCompService.compCreate(req.body);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getCompId(req, res, next) {
        try {
            const comp = await adminCompService.getCompId(req.params.id);
            const pools = await adminReferenceBooksService.pools_get()
            return res.json({comp,pools});
        } catch (e) {
            next(e);
        }
    }

    async compAvatarCreate(req, res, next) {
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

    async compDocsCreate(req, res, next) {
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

    async compUpdate(req, res, next) {
        try {
            const data = await adminCompService.compUpdate(req.body);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async compDelete(req, res, next) {
        try {
            const data = await adminCompService.compDelete(req.body.id);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getComp(req, res, next) {
        try {
            const data = await adminCompService.getComp();
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new adminCompController();