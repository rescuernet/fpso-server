const adminCompService = require('../../service/admin/admin-comp-service');
const {validationResult} = require('express-validator');
const ApiError = require('../../exceptions/api-error');
const Resize = require("../../function/Resize");
const Yandex = require('../../function/file-cloud')
const checkUpload = require("../../function/check-upload");


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
            const data = await adminCompService.getCompId(req.params.id);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async compAvatarCreate(req, res, next) {
        const checkFile = checkUpload.checkUploadFile(req.file, 'image')
        if(checkFile === 200){
            try {
                const fileUpload = new Resize();
                const filename = await fileUpload.save(req.file.buffer,'cover',300,300,null);
                const uploadDocs = await Yandex.UploadFile('',filename)
                return res.status(200).json({ name: uploadDocs.key });
            } catch (e) {
                next(e);
            }
        }else{
            return res.status(401).json({error: 'Ошибка загрузки'});
        }
    }

    async compDocsCreate(req, res, next) {
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

    async compUpdate(req, res, next) {
        try {
            const data = await adminCompService.compUpdate(req.body);
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