const {Schema, model} = require('mongoose');

const Rusada = new Schema({
    text: {type: String, default: '', trim: true},
    docs: {type: Object,default:[]},
})

module.exports = model('Rusada', Rusada);