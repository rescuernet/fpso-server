const NewsModel = require('../models/news/news-model.js');


class uiNewsService {

    async getNews(page = 1,limit = 9) {
        const query = {
            published: true,
            dateStart: {$lte: Date.now()},
            $or: [
                {dateEnd: ''},
                {dateEnd: {$gte: Date.now()}}
            ],
        }
        const options = {
            page: page,
            limit: limit,
            sort: {
                dateStart: -1,
                dateCreated: -1,
            }
        }
        const news = await NewsModel.paginate(query, options, function(err, result) {
            return result
        });
        return news
    }

    async getNewsId(id) {
        const news = await NewsModel.findById(id);
        return news
    }
}


module.exports = new uiNewsService();