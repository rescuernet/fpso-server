const uiService = require('../service/ui-service');


class uiController {

    async getNews(req, res, next) {
        try {
            const newsData = await uiService.getNews();
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new uiController();