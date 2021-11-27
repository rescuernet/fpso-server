const CompModel = require('../../models/competitions/competitions-model.js');
const fs = require("fs");
const dateFns = require("date-fns");


class adminCompService {

    async compCreate() {
        const comp = await CompModel.create({tmp: true});
        const compId = comp._id;
        const dir = `static/competitions/${compId}`;
        try {
            fs.mkdirSync(dir, {recursive: true})
            fs.mkdirSync(dir + '/avatar', {recursive: true})
            fs.mkdirSync(dir + '/images', {recursive: true})
            fs.mkdirSync(dir + '/docs', {recursive: true})
            return compId
        } catch (e) {
            fs.rmdirSync(dir, {recursive: true})
            await CompModel.findByIdAndDelete(compId)
            return {error: 'competition creation error'}
        }
    }

    async getCompId(id) {
        return CompModel.findById(id);
    }

    async compUpdate(arr) {
        const err = [];
        const candidate = await CompModel.find({ headerFirst: arr.headerFirst, _id: { $ne:  arr._id } }).lean()
        if(candidate.length){
            err.push(`Соревнование с таким заголовком уже существует`)
            return {error: err}
        }
        if (arr.dateStart === ''
            || arr.headerFirst.length < 4
            || arr.textMain.length < 5) {
            err.push(`Проверьте обязательные поля! Заголовок (не менее 4-х символов), Текст (не менее 5-ти символов)`)
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
            const comp = await CompModel.findOneAndUpdate({_id: arr._id}, arr);

            //удаление старого аватара
            const dirAvatar = `static/competitions/${arr._id}/avatar`
            const filesOnDirAvatar = fs.readdirSync(dirAvatar);
            const avatar = arr.avatar;
            filesOnDirAvatar.map((itemDirAvatar) => {
                if (!avatar.includes(itemDirAvatar)) {
                    try {fs.unlinkSync(`${dirAvatar}/${itemDirAvatar}`)} catch (e) {err.push('не удалился старый аватар');throw e}
                }
            })

            /*//удаление ненужных фотографий из папки с новостью
            const dirImg = `static/news/${arr._id}/images`
            const filesOnDirImg = fs.readdirSync(dirImg);
            const images = arr.images;
            filesOnDirImg.map((itemDirImg) => {
                if (!images.includes(itemDirImg)) {
                    if (!images.includes(itemDirImg.substr(5))) {
                        try {fs.unlinkSync(`${dirImg}/${itemDirImg}`)} catch (e) {err.push('не удалилась старая фотография');throw e}
                    }
                }
            })*/

            //удаление ненужных документов из папки
            const dirDocs = `static/competitions/${arr._id}/docs`
            const filesOnDirDocs = fs.readdirSync(dirDocs);
            const docs = arr.docs.map((i)=>{return i.doc});
            filesOnDirDocs.map((itemDirDocs) => {
                if (!docs.includes(itemDirDocs)) {
                    try {fs.unlinkSync(`${dirDocs}/${itemDirDocs}`)} catch (e) {err.push('не удалился старый документ');throw e}
                }
            })

            return comp;
        } catch (e) {
            return {error: err}
        }
    }

    async getComp() {
        const tmpComp = await CompModel.find({tmp: true},'_id')
        if(tmpComp){
            tmpComp.map(i=>{
                const id = i._id.toString()
                fs.rmdirSync(`static/competitions/${id}`, {recursive: true})
            })
            await CompModel.deleteMany({tmp: true})
        }
        return CompModel.find({tmp: false}).sort({dateStart: -1, createdAt: -1}).lean();
    }
}


module.exports = new adminCompService();