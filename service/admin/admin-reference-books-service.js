const PoolsModel = require('../../models/reference-books/pools.js');

class adminReferenceBooksService {

    async pools_get() {
        await PoolsModel.deleteMany({tmp: true})
        return PoolsModel.find({view: true}).lean();
    }

    async pools_create() {
        const response = await PoolsModel.create({tmpNews: true});
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


}


module.exports = new adminReferenceBooksService();