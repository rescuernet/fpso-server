const adminJudgesOrdersService = require('../../service/admin/admin-judges-orders-service')
const FileUpload = require("../../function/file-cloud");



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
        const orderType = req.query.ordertype
        try {
            const response = await adminJudgesOrdersService.judges_orders_people_get(orderType);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async judges_orders_docs_create(req, res, next) {
        if(req.file){
            try {
                await FileUpload.Upload(req.file.filename)
                return res.json({doc: req.file.filename});
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

    async judges_orders_delete(req, res, next) {
        try {
            const response = await adminJudgesOrdersService.judges_orders_delete(req.body.id);
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

}

module.exports = new adminJudgesOrdersController();