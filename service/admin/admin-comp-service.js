const CompModel = require('../../models/competitions/competitions-model.js');
const fs = require("fs");
const dateFns = require("date-fns");
const DeleteYandex = require("../../function/File-delete-yandex");


class adminCompService {

    async compCreate() {
        const comp = await CompModel.create({tmp: true});
        return comp._id;
    }

    async getCompId(id) {
        return CompModel.findById(id);
    }

    async compUpdate(arr) {
        const err = [];
        const candidate = await CompModel.find({ headerFirst: arr.data.headerFirst, _id: { $ne:  arr.data._id } }).lean()
        if(candidate.length){
            err.push(`Соревнование с таким заголовком уже существует`)
            return {error: err}
        }
        if (arr.data.dateStart === ''
            || arr.data.headerFirst.length < 4
            || arr.data.textMain.length < 5) {
            err.push(`Проверьте обязательные поля! Заголовок (не менее 4-х символов), Текст (не менее 5-ти символов)`)
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
            arr.data.tmp = false
            const comp = await CompModel.findOneAndUpdate({_id: arr.data._id}, arr.data);

            if(arr.mediaDel && arr.mediaDel.length > 0){
                arr.mediaDel.map((i)=>{
                    DeleteYandex.DeleteFile(i)
                })
            }

            return comp;
        } catch (e) {
            return {error: err}
        }
    }

    async getComp() {
        await CompModel.deleteMany({tmp: true})
        return CompModel.find({tmp: false}).sort({dateStart: -1, createdAt: -1}).lean();
    }
}


module.exports = new adminCompService();