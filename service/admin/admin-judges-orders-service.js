const JudgesOrders = require('../../models/judges-orders/judges-orders.js');
const PeopleModel = require('../../models/reference-books/people.js');

class adminJudgesOrdersService {

    async judges_orders_create() {
        const response = await JudgesOrders.create({tmp: true});
        return response._id
    }

    async judges_orders_id(id) {
        return JudgesOrders.findById(id);
    }

    async judges_orders_people_get() {
        return PeopleModel.find({view: true}).sort({surname: 1}).lean();
    }

    /*

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
        /!*if(!arr.gender) return {error: 'Не указан пол'}
        if(arr.gender === '') return {error: 'Не указан пол'}*!/
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

    async people_get() {
        await PeopleModel.deleteMany({tmp: true})
        return PeopleModel.find({}).sort({view: -1,surname: 1}).lean();
    }
*/

}


module.exports = new adminJudgesOrdersService();