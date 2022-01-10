const adminReferenceBooksService = require('../../service/admin/admin-reference-books-service')



class adminReferenceBooksController {

    async pools_get(req, res, next) {
        try {
            const response = await adminReferenceBooksService.pools_get();
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

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


}

module.exports = new adminReferenceBooksController();