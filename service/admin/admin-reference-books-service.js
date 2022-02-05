const PoolsModel = require('../../models/reference-books/pools.js');
const PeopleModel = require('../../models/reference-books/people.js');
const FileCloud = require("../../function/file-cloud");

class adminReferenceBooksService {

    async pools_create() {
        const response = await PoolsModel.create({tmp: true});
        return response._id
    }

    async pools_id(id) {
        return PoolsModel.findById(id);
    }

    async pools_save(arr) {
        if(!arr.name) return {error: 'Не указано название бассейна'}
        if(arr.name === '') return {error: 'Не указано название бассейна'}
        if(!arr.address) return {error: 'Не указан адрес бассейна'}
        if(arr.address === '') return {error: 'Не указан адрес бассейна'}

        try {
            arr.tmp = false
            return await PoolsModel.findOneAndUpdate({_id: arr._id}, arr);
        } catch (e) {
            return {error: `Что-то пошло не так... Обратитесь к разработчику. ${e}`}
        }
    }

    async pools_get() {
        await PoolsModel.deleteMany({tmp: true})
        return PoolsModel.find({view: true}).lean();
    }

    async people_create() {
        const response = await PeopleModel.create({tmp: true});
        return response._id
    }

    async people_id(id) {
        return PeopleModel.findById(id);
    }

    async people_save(arr) {
        if(arr.data.role.length === 0) return {error: 'Не выбрана роль'}
        /*if(!arr.data.gender) return {error: 'Не указан пол'}
        if(arr.data.gender === '') return {error: 'Не указан пол'}*/
        if(!arr.data.surname) return {error: 'Не указана фамилия'}
        if(arr.data.surname === '') return {error: 'Не указана фамилия'}
        if(arr.data.surname.length < 3) return {error: 'Фамилия не менее 3-х символов'}
        if(!arr.data.name) return {error: 'Не указано имя'}
        if(arr.data.name === '') return {error: 'Не указано имя'}
        if(arr.data.name.length < 3) return {error: 'Имя не менее 3-х символов'}
        if(!arr.data.patronymic) return {error: 'Не указано отчество'}
        if(arr.data.patronymic === '') return {error: 'Не указано отчество'}
        if(arr.data.patronymic.length < 3) return {error: 'Отчество не менее 3-х символов'}
        try {
            if(arr.mediaDel && arr.mediaDel.length > 0){
                FileCloud.Delete(arr.mediaDel)
            }
            arr.data.tmp = false
            return await PeopleModel.findOneAndUpdate({_id: arr.data._id}, arr.data);
        } catch (e) {
            return {error: `Что-то пошло не так... Обратитесь к разработчику. ${e}`}
        }
    }

    async people_get() {
        await PeopleModel.deleteMany({tmp: true})
        return PeopleModel.find({}).sort({view: -1,surname: 1}).lean();
    }


}


module.exports = new adminReferenceBooksService();