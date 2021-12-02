const NewsModel = require('../../models/news/news-model.js');
const fs = require("fs");
const dateFns = require('date-fns')


class adminNewsService {

    async news__create() {
        const dateStart = dateFns.format(new Date(), 'yyyy-MM-dd')

        const news = await NewsModel.create({dateStart: dateStart,tmpNews: true});
        const newsId = news._id;
        const dir = `static/news/${newsId}`;
        try {
            fs.mkdirSync(dir, {recursive: true})
            fs.mkdirSync(dir + '/avatar', {recursive: true})
            fs.mkdirSync(dir + '/images', {recursive: true})
            fs.mkdirSync(dir + '/docs', {recursive: true})
            return newsId
        } catch (e) {
            fs.rmdirSync(dir, {recursive: true})
            await NewsModel.findByIdAndDelete(newsId)
            return {error: 'error creating news'}
        }

    }

    async news__update(arr) {
        const err = [];
        const candidate = await NewsModel.find({ headerFirst: arr.headerFirst, _id: { $ne:  arr._id } }).lean()
        if(candidate.length){
            err.push(`Новость с таким заголовком уже существует`)
            return {error: err}
        }
        if (arr.dateStart === ''
            || arr.headerFirst.length < 4
            || arr.textMain.length < 5) {
            err.push(`Проверьте обязательные поля! Заголовок (не менее 4-х символов), Текст новости (не менее 5-ти символов)`)
        }

        if(arr.docs.length > 0){
            arr.docs.map((i)=>{
                if(i.title === ''){
                    err.push(`Не указано название прикрепленного файла`)
                }
            })
        }

        if(err.length > 0){
            return {error: err}
        }

        try {
            arr.tmpNews = false
            const news = await NewsModel.findOneAndUpdate({_id: arr._id}, arr);

            //удаление старого аватара
            const dirAvatar = `static/news/${arr._id}/avatar`
            const filesOnDirAvatar = fs.readdirSync(dirAvatar);
            const avatar = arr.avatar;
            filesOnDirAvatar.map((itemDirAvatar) => {
                if (!avatar.includes(itemDirAvatar)) {
                    try {fs.unlinkSync(`${dirAvatar}/${itemDirAvatar}`)} catch (e) {err.push('не удалился старый аватар');throw e}
                }
            })

            //удаление ненужных фотографий из папки с новостью
            const dirImg = `static/news/${arr._id}/images`
            const filesOnDirImg = fs.readdirSync(dirImg);
            const images = arr.images;
            filesOnDirImg.map((itemDirImg) => {
                if (!images.includes(itemDirImg)) {
                    if (!images.includes(itemDirImg.substr(5))) {
                        try {fs.unlinkSync(`${dirImg}/${itemDirImg}`)} catch (e) {err.push('не удалилась старая фотография');throw e}
                    }
                }
            })

            //удаление ненужных документов из папки с новостью
            const dirDocs = `static/news/${arr._id}/docs`
            const filesOnDirDocs = fs.readdirSync(dirDocs);
            const docs = arr.docs.map((i)=>{return i.doc});
            filesOnDirDocs.map((itemDirDocs) => {
                if (!docs.includes(itemDirDocs)) {
                    try {fs.unlinkSync(`${dirDocs}/${itemDirDocs}`)} catch (e) {err.push('не удалился старый документ');throw e}
                }
            })

            return news;
        } catch (e) {
            return {error: err}
        }
    }

    async news__delete(id) {
        const err = [];
        try {
            try {fs.rmdirSync(`static/news/${id}`, {recursive: true})} catch (e) {err.push('не удалилась папка новости');throw e}
            return await NewsModel.findOneAndDelete({_id: id})
        } catch (e) {
            return {error: err}
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