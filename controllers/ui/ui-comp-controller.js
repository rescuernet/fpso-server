const uiCompService = require('../../service/ui/ui-comp-service');


class uiCompController {

    async getComp(req, res, next) {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        try {
            const data = await uiCompService.getComp(page,limit);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getCompId(req, res, next) {
        try {
            const data = await uiCompService.getCompId(req.params.id);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new uiCompController();