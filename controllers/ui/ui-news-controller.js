const uiNewsService = require('../../service/ui/ui-news-service');


class uiNewsController {

    async getNews(req, res, next) {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        try {
            const newsData = await uiNewsService.getNews(page,limit);
            console.log('newsData',newsData)
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

    async getNewsId(req, res, next) {
        try {
            const newsData = await uiNewsService.getNewsId(req.params.id);
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new uiNewsController();