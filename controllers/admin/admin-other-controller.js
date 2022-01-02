const adminOtherService = require('../../service/admin/admin-other-service');
const Yandex = require("../../function/file-cloud");




class adminOtherController {

    async media_del_tmp(req, res, next) {
        const arr = req.body.mediaDelTmp
        try {
            if(arr && arr.length > 0){
                Yandex.DeleteFile(arr)
            }
            return res.json({status: 200});
        } catch (e) {
            next(e);
        }
    }

    async referenceBooks__update(req, res, next) {
        try {
            const referenceBooksData = await adminOtherService.referenceBooks__update(req.body);
            return res.json(referenceBooksData);
        } catch (e) {
            next(e);
        }
    }

    async referenceBooks__get(req, res, next) {
        try {
            const referenceBooksData = await adminOtherService.referenceBooks__get();
            return res.json(referenceBooksData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new adminOtherController();