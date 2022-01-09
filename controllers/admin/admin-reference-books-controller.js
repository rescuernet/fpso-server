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

    /*async referenceBooks__update(req, res, next) {
        try {
            const referenceBooksData = await adminReferenceBookService.referenceBooks__update(req.body);
            return res.json(referenceBooksData);
        } catch (e) {
            next(e);
        }
    }

    async referenceBooks__get(req, res, next) {
        try {
            const referenceBooksData = await adminReferenceBookService.referenceBooks__get();
            return res.json(referenceBooksData);
        } catch (e) {
            next(e);
        }
    }*/
}

module.exports = new adminReferenceBooksController();