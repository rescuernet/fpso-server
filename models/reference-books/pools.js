const {Schema, model} = require('mongoose');

const Pools = new Schema({
    name: {type: String},
    address: {type: String},
    tmp: {type: Boolean, default: true}
})

module.exports = model('Pools', Pools);