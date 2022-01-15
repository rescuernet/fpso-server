const PoolsModel = require('../../models/reference-books/pools.js');
const PeopleModel = require('../../models/reference-books/people.js');

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
        if(arr.role.length === 0) return {error: 'Не выбрана роль'}
        if(!arr.gender) return {error: 'Не указан пол'}
        if(arr.gender === '') return {error: 'Не указан пол'}
        if(!arr.surname) return {error: 'Не указана фамилия'}
        if(arr.surname === '') return {error: 'Не указана фамилия'}
        if(arr.surname.length < 3) return {error: 'Фамилия не менее 3-х символов'}
        if(!arr.name) return {error: 'Не указано имя'}
        if(arr.name === '') return {error: 'Не указано имя'}
        if(arr.name.length < 3) return {error: 'Имя не менее 3-х символов'}
        if(!arr.patronymic) return {error: 'Не указано отчество'}
        if(arr.patronymic === '') return {error: 'Не указано отчество'}
        if(arr.patronymic.length < 3) return {error: 'Отчество не менее 3-х символов'}
        try {
            arr.tmp = false
            return await PeopleModel.findOneAndUpdate({_id: arr._id}, arr);
        } catch (e) {
            return {error: `Что-то пошло не так... Обратитесь к разработчику. ${e}`}
        }
    }


}


module.exports = new adminReferenceBooksService();