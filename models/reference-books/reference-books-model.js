const {Schema, model} = require('mongoose');

const ReferenceBooks = new Schema({
    pool: {type: Object},
    school: {type: Object}
})

module.exports = model('ReferenceBooks', ReferenceBooks);