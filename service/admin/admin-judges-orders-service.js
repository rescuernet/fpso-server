const JudgesOrders = require('../../models/judges-orders/judges-orders.js');
const PeopleModel = require('../../models/reference-books/people.js');

class adminJudgesOrdersService {

    async judges_orders_create() {
        const response = await JudgesOrders.create({tmp: true});
        return response._id
    }

    async judges_orders_id(id) {
        return JudgesOrders.findById(id).populate('judges');
    }

    async judges_orders_people_get() {
        return PeopleModel.find({view: true}).sort({surname: 1}).lean();
    }


    async judges_orders_save(arr) {
        console.log(arr)
        if(arr.dateOrder === '') return {error: 'Не указана дата приказа'}
        if(arr.orderType === '') return {error: 'Не указан тип приказа'}
        if(arr.judges.length === 0) return {error: 'Не выбраны судьи'}
        /*if(arr.docs.length === 0) return {error: 'Не выбран документ приказа'}*/
        try {
            return await JudgesOrders.findOneAndUpdate({_id: arr._id}, arr);
        } catch (e) {
            return {error: `Что-то пошло не так... Обратитесь к разработчику. ${e}`}
        }
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



    async people_get() {
        await PeopleModel.deleteMany({tmp: true})
        return PeopleModel.find({}).sort({view: -1,surname: 1}).lean();
    }
*/

}


module.exports = new adminJudgesOrdersService();