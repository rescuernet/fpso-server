const ReferenceBooksModel = require('../../models/reference-books/reference-books-model.js');

class adminOtherService {

    async referenceBooks__update(Arr) {
        await ReferenceBooksModel.findOneAndDelete({});
        return await ReferenceBooksModel.create(Arr);
    }

    async referenceBooks__get() {
        return ReferenceBooksModel.findOne({}).lean();
    }
}


module.exports = new adminOtherService();