const NewsModel = require('../../models/news/news-model.js');

const dateFns = require("date-fns")

class uiNewsService {

    async getNews(page = 1,limit = 10) {
        const query = {
            published: true,
            dateStart: {$lte: dateFns.format(new Date(Date.now()), 'yyyy-MM-dd')},
            $or: [
                {dateEnd: ''},
                {dateEnd: {$gte: dateFns.format(new Date(Date.now()), 'yyyy-MM-dd')}}
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