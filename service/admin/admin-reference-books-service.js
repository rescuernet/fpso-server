const PoolsModel = require('../../models/reference-books/pools.js');

class adminReferenceBooksService {

    async pools_get() {
        await PoolsModel.deleteMany({tmp: true})
        return PoolsModel.find({}).lean();
    }

    async pools_create() {
        const response = await PoolsModel.create({tmpNews: true});
        return response._id
    }

    async pools_id(id) {
        return PoolsModel.findById(id);
    }

    /*async referenceBooks__update(Arr) {
        await ReferenceBooksModel.findOneAndDelete({});
        return await ReferenceBooksModel.create(Arr);
    }

    async referenceBooks__get() {
        return ReferenceBooksModel.findOne({}).lean();
    }*/
}


module.exports = new adminReferenceBooksService();