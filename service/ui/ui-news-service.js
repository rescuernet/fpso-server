const NewsModel = require('../../models/news/news-model.js');

const dateFns = require("date-fns")

class uiNewsService {
    newsModel
   constructor( NewsModel) {
        this.newsModel = NewsModel
   }
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
                fixedNews: -1,
                dateStart: -1,
                dateCreated: -1,
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