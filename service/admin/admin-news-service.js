const NewsModel = require('../../models/news/news-model.js');
const fs = require("fs");
const dateFns = require('date-fns')
const Yandex = require('../../function/file-cloud')


class adminNewsService {

    async news__create() {
        const dateStart = dateFns.format(new Date(), 'yyyy-MM-dd')
        const news = await NewsModel.create({dateStart: dateStart,tmpNews: true});
        return news._id;
    }

    async news__update(arr) {
        if(arr.data.dateStart === '') return {error: 'Не указана дата старта новости'}
        if(!arr.data.headerFirst) return {error: 'Нет заголовка новости'}
        if(arr.data.headerFirst.length < 4) return {error: 'Минимальная длина заголовка новости 4 символа'}
        if(!arr.data.textMain) return {error: 'Нет текста новости'}
        if(arr.data.textMain && arr.data.textMain.length < 5) return {error: 'Минимальная длина текста новости 5 символов'}
        const candidate = await NewsModel.find({ headerFirst: arr.data.headerFirst, _id: { $ne:  arr.data._id } }).lean()
        if(candidate.length) return {error: 'Новость с таким заголовком уже существует'}

        if(arr.data.docs.length > 0){
            arr.data.docs.map((i)=>{
                if(i.title === '') return {error: 'Не указано название прикрепленного файла'}
            })
        }

        try {
            if(arr.mediaDel && arr.mediaDel.length > 0){
                Yandex.DeleteFile(arr.mediaDel)
            }
            arr.data.tmpNews = false
            return await NewsModel.findOneAndUpdate({_id: arr.data._id}, arr.data);
        } catch (e) {
            return {error: `Что-то пошло не так... Обратитесь к разработчику. ${e}`}
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
            Yandex.DeleteFile(mediaDel)
        }
    }

    async getNews() {
        await NewsModel.deleteMany({tmpNews: true})
        return NewsModel.find({tmpNews: false}).sort({dateStart: -1, createdAt: -1}).lean();
    }

    async getNewsId(id) {
        return NewsModel.findById(id);
    }
}


module.exports = new adminNewsService();