const NewsModel = require('../models/news/news-model.js');


class uiService {

    async getNews(page) {
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
            limit: 9,
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
}


module.exports = new uiService();