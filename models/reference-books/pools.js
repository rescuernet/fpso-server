const {Schema, model} = require('mongoose');

const Pools = new Schema({
    name: {type: String, trim: true},
    address: {type: String, trim: true},
    view: {type: Boolean, default: true},
    tmp: {type: Boolean, default: true}
})

module.exports = model('Pools', Pools);