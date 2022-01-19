const adminJudgesOrdersService = require('../../service/admin/admin-judges-orders-service')
const checkUpload = require("../../function/check-upload");
const Resize = require("../../function/Resize");
const Yandex = require("../../function/file-cloud");



class adminJudgesOrdersController {

    async judges_orders_create(req, res, next) {
        try {
            const response = await adminJudgesOrdersService.judges_orders_create();
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async judges_orders_id(req, res, next) {
        try {
            const response = await adminJudgesOrdersService.judges_orders_id(req.params.id);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async judges_orders_people_get(req, res, next) {
        try {
            const response = await adminJudgesOrdersService.judges_orders_people_get();
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async judges_orders_docs_create(req, res, next) {
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


    async judges_orders_save(req, res, next) {
        try {
            const response = await adminJudgesOrdersService.judges_orders_save(req.body);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async judges_orders_get(req, res, next) {
        const orderType = req.query.ordertype
        try {
            const response = await adminJudgesOrdersService.judges_orders_get(orderType);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    /*

    async pools_save(req, res, next) {
        try {
            const response = await adminReferenceBooksService.pools_save(req.body);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async pools_get(req, res, next) {
        try {
            const response = await adminReferenceBooksService.pools_get();
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async people_create(req, res, next) {
        try {
            const response = await adminReferenceBooksService.people_create();
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async people_id(req, res, next) {
        try {
            const response = await adminReferenceBooksService.people_id(req.params.id);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async people_avatar_create(req, res, next) {
        const checkFile = checkUpload.checkUploadFile(req.file, 'image')
        if(checkFile === 200){
            try {
                const fileUpload = new Resize();
                const filename = await fileUpload.save(req.file.buffer,'inside',300,300,null);
                const uploadDocs = await Yandex.UploadFile('',filename)
                return res.status(200).json({ name: uploadDocs.key });
            } catch (e) {
                next(e);
            }
        }else{
            return res.status(401).json({error: 'Ошибка загрузки'});
        }
    }



    async people_get(req, res, next) {
        try {
            const response = await adminReferenceBooksService.people_get();
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }
*/

}

module.exports = new adminJudgesOrdersController();