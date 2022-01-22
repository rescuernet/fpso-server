const JudgesOrders = require('../../models/judges-orders/judges-orders.js');
const PeopleModel = require('../../models/reference-books/people.js');
const {log} = require("sharp/lib/libvips");
const Yandex = require("../../function/file-cloud");

class adminJudgesOrdersService {

    async judges_orders_create() {
        const response = await JudgesOrders.create({tmp: true});
        return response._id
    }

    async judges_orders_id(id) {
        return JudgesOrders.findById(id).populate('judges');
    }

    async judges_orders_people_get(orderType) {
        const rank = orderType.substring(5,0)
        const doc_type = orderType.substr(-3)

        /*console.log('rank: ' + rank + ' doc_type: ' + doc_type)*/

        let query = {
            view: true,
            role: {$in:['judges']}
        }

        if(rank === 'cat_v'){query.rank_judges = 'cat_1'}
        if(rank === 'cat_1'){query.rank_judges = 'cat_2'}
        if(rank === 'cat_2'){query.rank_judges = 'cat_3'}
        if(rank === 'cat_3'){query.rank_judges = ''}

        if (doc_type === 'ext'){query.rank_judges = rank}

        return PeopleModel.find(query).sort({surname: 1}).lean();
    }


    async judges_orders_save(arr) {
        if (arr.data.dateOrder === '') return {error: 'Не указана дата приказа'}
        if (arr.data.orderType === '') return {error: 'Не указан тип приказа'}
        if (arr.data.judges.length === 0) return {error: 'Не выбраны судьи'}
        if (arr.data.docs.length === 0) return {error: 'Не выбран документ приказа'}

        try {
            const oldPeople = await JudgesOrders.findById(arr.data._id).select('judges')
            if(oldPeople.judges.length > 0){
                await PeopleModel.updateMany({_id: {$in: oldPeople.judges}}, {orderId: '', rank_judges: ''})
            }

            if(arr.data.orderType.substr(-3) === 'app') {
                await JudgesOrders.updateMany({judges: {$in: arr.data.judges} }, {$pull: {judges: {$in: arr.data.judges}}})
            }

            await PeopleModel.updateMany({_id: {$in: arr.data.judges}}, {orderId: arr.data._id, rank_judges: arr.data.orderType.substring(5,0)})

            if(arr.mediaDel && arr.mediaDel.length > 0){
                Yandex.DeleteFile(arr.mediaDel)
            }

            const result = await JudgesOrders.findOneAndUpdate({_id: arr.data._id}, arr.data);
            return result
        } catch (e) {
            return {error: `Что-то пошло не так... Обратитесь к разработчику. ${e}`}
        }
    }

    async judges_orders_get(orderType) {

        const orderForDel = await JudgesOrders.find({judges:{$size:0}}).select('docs')
        let delOrder = []
        let delDocs = []
        orderForDel.map((i)=>{delOrder.push(i.id);i.docs.map((ii)=>{delDocs.push(ii.doc)})})

        if(delDocs.length > 0){Yandex.DeleteFile(delDocs)}

        await JudgesOrders.deleteMany({$or:[{tmp:true},{_id:{$in:delOrder}}]})

        const query = {view: true}
        if (orderType) query.orderType = orderType
        return JudgesOrders.find(query).populate('judges').sort({orderType: 1}).lean();
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