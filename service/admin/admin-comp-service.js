const CompModel = require('../../models/competitions/competitions-model.js');
const fs = require("fs");
const dateFns = require("date-fns");
const Yandex = require("../../function/file-cloud");


class adminCompService {

    async compCreate() {
        const comp = await CompModel.create({tmp: true});
        return comp._id;
    }

    async getCompId(id) {
        return CompModel.findById(id);
    }

    async compUpdate(arr) {
        if(!arr.data.dateStart || arr.data.dateStart === '') return {error: 'Не указана дата старта соревнований'}
        if(!arr.data.dateEnd || arr.data.dateEnd === '') return {error: 'Не указана дата окончания соревнований'}
        if(arr.data.dateEnd < arr.data.dateStart) return {error: 'Дата окончания соревнований не может быть раньше старта'}
        if(!arr.data.location || arr.data.location === '') return {error: 'Не указано место проведения соревнований'}
        if(!arr.data.headerFirst) return {error: 'Не указан заголовок соревнований'}
        if(arr.data.headerFirst.length < 4) return {error: 'Минимальная длина заголовка соревнований 4 символа'}
        if(!arr.data.textMain) return {error: 'Не указан текст, описывающий соревнования'}
        if(arr.data.textMain && arr.data.textMain.length < 5) return {error: 'Минимальная длина текста соревнований 5 символов'}

        const candidate = await CompModel.find({ headerFirst: arr.data.headerFirst, _id: { $ne:  arr.data._id } }).lean()
        if(candidate.length) return {error: `Соревнование с таким заголовком уже существует`}

        const res = arr.data.docs.map((i) => {
            if(i.title === ''){
                return {error: `Не указано название прикрепленного документа в разделе общих документов соревнования`}
            }
        }).filter(j => j)
        if(res.length) return res[0]

        const resResult = arr.data.results.map((i, index)=>{
            const res = i.docs.map((ii)=>{
                if(ii.title === ''){
                    return {error: `Не указано название прикрепленного документа ${index + 1}-го дня соревнований`}
                }
            }).filter(j => j)
            if(res.length) return res[0]
        }).filter(j => j)
        if(resResult.length) return resResult[0]

        try {
            if(arr.mediaDel && arr.mediaDel.length > 0){
                Yandex.DeleteFile(arr.mediaDel)
            }
            arr.data.tmp = false
            return await CompModel.findOneAndUpdate({_id: arr.data._id}, arr.data);

        } catch (e) {
            return {error: `Что-то пошло не так... Обратитесь к разработчику. ${e}`}
        }
    }

    async compDelete(id) {
        let mediaDel = [];
        const compOne = await CompModel.findById(id);
        if(compOne.avatar){mediaDel.push(compOne.avatar)}
        compOne.images.map((i)=>{
            mediaDel.push(i)
        })
        compOne.docs.map((i)=>{
            mediaDel.push(i.doc)
        })

        compOne.results.map((i)=>{
            i.docs.map((ii)=>{
                mediaDel.push(ii.doc)
            })
        })

        await CompModel.findOneAndDelete({_id: id})

        if(mediaDel && mediaDel.length > 0){
            Yandex.DeleteFile(mediaDel)
        }
    }

    async getComp() {
        await CompModel.deleteMany({tmp: true})
        return CompModel.find({tmp: false}).sort({dateStart: -1, createdAt: -1}).lean();
    }
}


module.exports = new adminCompService();