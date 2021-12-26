const NewsModel = require('../../models/news/news-model.js');
const fs = require("fs");
const dateFns = require('date-fns')
const DeleteYandex = require('../../function/File-delete-yandex')


class adminNewsService {

    async news__create() {
        const dateStart = dateFns.format(new Date(), 'yyyy-MM-dd')

        const news = await NewsModel.create({dateStart: dateStart,tmpNews: true});
        return news._id;
    }

    async news__update(arr) {
        const err = [];
        const candidate = await NewsModel.find({ headerFirst: arr.data.headerFirst, _id: { $ne:  arr.data._id } }).lean()
        if(candidate.length){
            err.push(`Новость с таким заголовком уже существует`)
            return {error: err}
        }
        if (arr.data.dateStart === ''
            || arr.data.headerFirst.length < 4
            || arr.data.textMain.length < 5) {
            err.push(`Проверьте обязательные поля! Заголовок (не менее 4-х символов), Текст новости (не менее 5-ти символов)`)
        }

        if(arr.data.docs.length > 0){
            arr.data.docs.map((i)=>{
                if(i.title === ''){
                    err.push(`Не указано название прикрепленного файла`)
                }
            })
        }

        if(err.length > 0){
            return {error: err}
        }

        try {
            arr.data.tmpNews = false
            const news = await NewsModel.findOneAndUpdate({_id: arr.data._id}, arr.data);

            if(arr.mediaDel && arr.mediaDel.length > 0){
                arr.mediaDel.map((i)=>{
                    DeleteYandex.DeleteFile(i)
                })
            }

            return news;
        } catch (e) {
            return {error: err}
        }
    }

    async news__delete(id) {
        let mediaDel = [];
        const newsOne = await NewsModel.findById(id);
        mediaDel.push(newsOne.avatar)
        newsOne.images.map((i)=>{
            mediaDel.push(i)
        })
        newsOne.docs.map((i)=>{
            mediaDel.push(i.doc)
        })

        await NewsModel.findOneAndDelete({_id: id})

        if(mediaDel && mediaDel.length > 0){
            mediaDel.map((i)=>{
                DeleteYandex.DeleteFile(i)
            })
        }

    }

    async getNews() {
        const tmpNews = await NewsModel.find({tmpNews: true},'_id')
        if(tmpNews){
            tmpNews.map(i=>{
                const id = i._id.toString()
                fs.rmdirSync(`static/news/${id}`, {recursive: true})
            })
            await NewsModel.deleteMany({tmpNews: true})
        }
        return NewsModel.find({tmpNews: false}).sort({dateStart: -1, createdAt: -1}).lean();
    }

    async getNewsId(id) {
        return NewsModel.findById(id);
    }
}


module.exports = new adminNewsService();