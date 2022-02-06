const adminReferenceBooksService = require('../../service/admin/admin-reference-books-service')
const Resize = require("../../function/Resize");



class adminReferenceBooksController {

    async pools_create(req, res, next) {
        try {
            const response = await adminReferenceBooksService.pools_create();
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async pools_id(req, res, next) {
        try {
            const response = await adminReferenceBooksService.pools_id(req.params.id);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

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

    async people_save(req, res, next) {
        try {
            const response = await adminReferenceBooksService.people_save(req.body);
            return res.json(response);
        } catch (e) {
            next(e);
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


}

module.exports = new adminReferenceBooksController();