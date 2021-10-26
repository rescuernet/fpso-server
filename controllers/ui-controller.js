const uiService = require('../service/ui-service');
const NewsModel = require('../models/news/news-model.js');


class uiController {

    async getNews(req, res, next) {
        const page = parseInt(req.query.page)
        try {
            const newsData = await uiService.getNews(page);
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new uiController();