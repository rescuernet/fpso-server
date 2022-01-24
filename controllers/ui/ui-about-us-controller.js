const AboutUsModel = require('../../models/about-us/about-us-model.js');


class uiAboutUsController {

    async about_us_get(req, res, next) {
        try {
            const data = await AboutUsModel.findOne({}).lean();
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new uiAboutUsController();