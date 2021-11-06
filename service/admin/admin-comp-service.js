const NewsModel = require('../../models/news/news-model.js');
const fs = require("fs");


class adminCompService {
/*    async news__create(arr) {
        const err = [];
        if (arr.dateStart === ''
            || arr.headerFirst === ''
            || arr.headerFirst.length < 4
            || arr.textMain === ''
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

        const candidate = await NewsModel.findOne({headerFirst: arr.headerFirst});
        if (candidate) {
            err.push('Новость с таким заголовком уже существует')
            return {error: err}
        }
        const news = await NewsModel.create(arr);
        const newsId = news._id;
        const dir = `static/news/${newsId}`;
        try {
            try {fs.mkdirSync(dir, {recursive: true})} catch (e) {err.push('не создалась директория новости');throw e}
            try {fs.mkdirSync(dir + '/avatar', {recursive: true})} catch (e) {err.push('не создалась директория avatar');throw e}
            try {fs.mkdirSync(dir + '/images', {recursive: true})} catch (e) {err.push('не создалась директория images');throw e}
            try {fs.mkdirSync(dir + '/docs', {recursive: true})} catch (e) {err.push('не создалась директория docs');throw e}
            if(arr.avatar){
                try {fs.copyFileSync(`static/tmp/${arr.avatar}`, `${dir}/avatar/${arr.avatar}`)} catch (e) {err.push('не скопировался аватар');throw e}
            }
            if(arr.images.length > 0){
                const images = arr.images;
                images.map((i) => {
                    try {fs.copyFileSync(`static/tmp/${i}`, `${dir}/images/${i}`)} catch (e) {err.push('не скопировалась фотография');throw e}
                    try {fs.copyFileSync(`static/tmp/crop_${i}`, `${dir}/images/crop_${i}`)} catch (e) {err.push('не скопировалась фотография');throw e}
                })
            }
            if (arr.docs.length > 0) {
                const docs = arr.docs;
                docs.map((i) => {
                    try {fs.copyFileSync(`static/tmp/${i.doc}`, `${dir}/docs/${i.doc}`)} catch (e) {err.push(`не скопировался документ ${i.doc}`);throw e}
                })
            }

            const filesOnDirTMP = fs.readdirSync('static/tmp');
            filesOnDirTMP.map((i)=>{
                fs.unlinkSync(`static/tmp/${i}`)
            })

            return news
        } catch (e) {
            fs.rmdirSync(dir, {recursive: true})
            await NewsModel.findByIdAndDelete(newsId)
            return {error: err}
        }

    }

    async news__update(arr) {

        const err = [];
        if (arr.model.dateStart === ''
            || arr.model.headerFirst === ''
            || arr.model.headerFirst.length < 4
            || arr.model.textMain === ''
            || arr.model.textMain.length < 5) {
            err.push(`Проверьте обязательные поля! Заголовок (не менее 4-х символов), Текст новости (не менее 5-ти символов)`)
        }

        if(arr.docsNew.length > 0){
            arr.docsNew.map((i)=>{
                if(i.title === ''){
                    err.push(`Не указано название прикрепленного файла`)
                }
            })
        }
        if(arr.docsOld.length > 0){
            arr.docsOld.map((i)=>{
                if(i.title === ''){
                    err.push(`Не указано название прикрепленного файла`)
                }
            })
        }

        if(err.length > 0){
            return {error: err}
        }

        try {
            const news = await NewsModel.findOneAndUpdate({_id: arr.id}, arr.model);

            //копирование нового аватара
            if (arr.avatarNew) {
                try {fs.copyFileSync(`static/tmp/${arr.avatarNew}`, `static/news/${arr.id}/avatar/${arr.avatarNew}`)} catch (e) {err.push('не скопировался аватар');throw e}
            }

            //удаление ненужных фотографий из папки с новостью
            const dirImg = `static/news/${arr.id}/images`
            const filesOnDirImg = fs.readdirSync(dirImg);
            const imagesOld = arr.imagesOld;
            filesOnDirImg.map((itemDirImg) => {
                if (!imagesOld.includes(itemDirImg)) {
                    if (!imagesOld.includes(itemDirImg.substr(5))) {
                        try {fs.unlinkSync(`${dirImg}/${itemDirImg}`)} catch (e) {err.push('не удалилась старая фотография');throw e}
                    }
                }
            })

            //копирование новых фотографий
            if(arr.imagesNew.length > 0){
                const imagesNew = arr.imagesNew;
                imagesNew.map((i) => {
                    try {fs.copyFileSync(`static/tmp/${i}`, `${dirImg}/${i}`)} catch (e) {err.push('не скопировалась фотография');throw e}
                    try {fs.copyFileSync(`static/tmp/crop_${i}`, `${dirImg}/crop_${i}`)} catch (e) {err.push('не скопировалась фотография crop');throw e}
                })
            }


            //удаление ненужных документов из папки с новостью
            const dirDocs = `static/news/${arr.id}/docs`
            const filesOnDirDocs = fs.readdirSync(dirDocs);
            const docsOld = arr.docsOld.map((i)=>{return i.doc});

            filesOnDirDocs.map((itemDirDocs) => {
                if (!docsOld.includes(itemDirDocs)) {
                    try {fs.unlinkSync(`${dirDocs}/${itemDirDocs}`)} catch (e) {err.push('не удалился старый документ');throw e}
                }
            })

            //копирование новых фотографий
            if(arr.docsNew.length > 0){
                const docsNew = arr.docsNew;
                docsNew.map((i) => {
                    try {fs.copyFileSync(`static/tmp/${i.doc}`, `${dirDocs}/${i.doc}`)} catch (e) {err.push('не скопировался документ');throw e}
                })
            }

            //удаление старого аватара
            if (arr.avatarNew && arr.avatarOld) {
                try {fs.unlinkSync(`static/news/${arr.id}/avatar/${arr.avatarOld}`)} catch (e) {err.push('не удалился старый аватар');throw e}
            }

            const filesOnDirTMP = fs.readdirSync('static/tmp');
            filesOnDirTMP.map((i)=>{
                fs.unlinkSync(`static/tmp/${i}`)
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
            const news = await NewsModel.findOneAndDelete({_id: id});
            return news
        } catch (e) {
            return {error: err}
        }

    }

    async getNews() {
        const news = await NewsModel.find({}).sort({dateStart: -1,dateCreated: -1}).exec();
        return news
    }*/
}


module.exports = new adminCompService();