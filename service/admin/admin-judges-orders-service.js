const JudgesOrders = require('../../models/judges-orders/judges-orders.js');
const PeopleModel = require('../../models/reference-books/people.js');
const FileCloud = require("../../function/file-cloud");

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

        let query = {
            view: true,
            role: {$in:['judges']}
        }

        if(rank === 'cat_0'){query.rank_judges = 'cat_1'}
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
                const rank = arr.data.orderType.substring(5,0)
                let body = {orderId: '', rank_judges: ''}
                if(rank === 'cat_0') body.rank_judges = 'cat_1'
                if(rank === 'cat_1') body.rank_judges = 'cat_2'
                if(rank === 'cat_2') body.rank_judges = 'cat_3'
                if(rank === 'cat_3') body.rank_judges = ''
                await PeopleModel.updateMany({_id: {$in: oldPeople.judges}}, body)
            }

            if(arr.data.orderType.substr(-3) === 'app') {
                await JudgesOrders.updateMany({judges: {$in: arr.data.judges} }, {$pull: {judges: {$in: arr.data.judges}}})
            }

            await PeopleModel.updateMany({_id: {$in: arr.data.judges}}, {orderId: arr.data._id, rank_judges: arr.data.orderType.substring(5,0)})

            if(arr.mediaDel && arr.mediaDel.length > 0){
                FileCloud.Delete(arr.mediaDel)
            }
            arr.data.tmp = false
            const result = await JudgesOrders.findOneAndUpdate({_id: arr.data._id}, arr.data);
            return result
        } catch (e) {
            return {error: `Что-то пошло не так... Обратитесь к разработчику. ${e}`}
        }
    }

    async judges_orders_delete(id) {
        try {
            const order = await JudgesOrders.findById(id)
            if(order.orderType.substr(-3) === 'app'){
                const rank = order.orderType.substring(5,0)
                let body = {orderId: '', rank_judges: ''}
                if(rank === 'cat_0') body.rank_judges = 'cat_1'
                if(rank === 'cat_1') body.rank_judges = 'cat_2'
                if(rank === 'cat_2') body.rank_judges = 'cat_3'
                if(rank === 'cat_3') body.rank_judges = ''
                await PeopleModel.updateMany({_id: {$in: order.judges}}, body)
            }
            await JudgesOrders.findOneAndDelete({_id: id})
            let delDocs = []
            order.docs.map((i)=>{delDocs.push(i.doc)})
            if(delDocs.length > 0){FileCloud.Delete(delDocs)}
            return {status:200}
        } catch (e) {
            return {error: `Что-то пошло не так... Обратитесь к разработчику. ${e}`}
        }
    }

    async judges_orders_get(orderType) {
        const orderForDel = await JudgesOrders.find({judges:{$size:0}}).select('docs')
        let delOrder = []
        let delDocs = []
        orderForDel.map((i)=>{delOrder.push(i.id);i.docs.map((ii)=>{delDocs.push(ii.doc)})})

        if(delDocs.length > 0){FileCloud.Delete(delDocs)}

        await JudgesOrders.deleteMany({$or:[{tmp:true},{_id:{$in:delOrder}}]})

        const query = {}
        if (orderType) query.orderType = orderType
        return JudgesOrders.find(query).populate('judges').sort({orderType: 1,dateOrder:-1}).lean();
    }
}


module.exports = new adminJudgesOrdersService();