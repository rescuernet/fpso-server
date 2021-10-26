const NewsModel = require('../models/admin/news/news-model.js');


class uiService {

    async getNews() {
        const news = await NewsModel.find({published: true}).sort({dateStart: -1}).exec();
        return news
    }
}


module.exports = new uiService();