const RusadaModel = require("../../models/rusada/rusada-model.js");


class uiRusadaController {

    async rusada_get(req, res, next) {
        try {
            const data = await RusadaModel.findOne({}).lean();
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new uiRusadaController();