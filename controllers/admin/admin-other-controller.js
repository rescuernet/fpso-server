const adminOtherService = require('../../service/admin/admin-other-service');



class adminOtherController {

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