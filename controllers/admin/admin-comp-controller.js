const adminCompService = require('../../service/admin/admin-comp-service');
const {validationResult} = require('express-validator');
const ApiError = require('../../exceptions/api-error');
const Resize = require("../../function/Resize");
const fs = require("fs");


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
        try {
            const fileUpload = new Resize(`./static/competitions/${req.body.compId}/avatar`);
            if (!req.file) {
                return res.status(401).json({error: 'Please provide an image'});
            }
            const filename = await fileUpload.save(req.file.path,'cover',300,250,null,true);
            return res.status(200).json({ name: filename });
        } catch (e) {
            next(e);
        }
    }

    async compDocsCreate(req, res, next) {
        try {
            try {
                fs.renameSync('static/tmp/'+req.file.filename,'static/competitions/'+req.body.compId+'/docs/'+req.file.filename)
            } catch (err) {
                console.error(err)
            }
            return res.json({doc: req.file.filename});
        } catch (e) {
            next(e);
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