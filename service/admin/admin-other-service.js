const ReferenceBooksModel = require('../../models/reference-books/reference-books-model.js');

class adminOtherService {

    /*async referenceBooks__update() {
        return await ReferenceBooksModel.create({pool:[{address:'hjhjk'}]});
    }*/

    async referenceBooks__update(Arr) {
        await ReferenceBooksModel.findOneAndDelete({});
        return ReferenceBooksModel.create(Arr);
    }

    async referenceBooks__get() {
        return ReferenceBooksModel.findOne({}).lean();
    }
}


module.exports = new adminOtherService();