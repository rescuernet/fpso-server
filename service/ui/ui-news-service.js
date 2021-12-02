const NewsModel = require('../../models/news/news-model.js');

const dateFns = require("date-fns")

class uiNewsService {
    newsModel
   constructor( NewsModel) {
        this.newsModel = NewsModel
   }
    async getNews(page = 1,limit = 10) {
        const date = dateFns.format(new Date(Date.now()), 'yyyy-MM-dd')
        const query = {
            published: true,
            tmpNews: false,
            dateStart: {$lte: date},
            $or: [
                {dateEnd: ''},
                {dateEnd: {$gte: date}}
            ],
        }
        const options = {
            page: page,
            limit: limit,
            sort: {
                fixedNews: -1,
                dateStart: -1,
                createdAt: -1,
            }
        }
        return  this.newsModel.paginate(query, options, function(err, result) {
            return result
        });
    }

    async getNewsId(id) {
        return  this.newsModel.findById(id);
    }
}


module.exports = new uiNewsService(NewsModel);