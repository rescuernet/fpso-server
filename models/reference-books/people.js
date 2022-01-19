const {Schema, model} = require('mongoose');

const Peoples = new Schema({
    avatar: {type: String, default: '', trim: true},
    role: {type: Object,default:[]},
    gender: {type: String, default: ''},
    surname: {type: String, default: '', trim: true},
    name: {type: String, default: '', trim: true},
    patronymic: {type: String, default: '', trim: true},
    date_birth: {type: Date, default:''},
    rank_judges: {type: String, default: ''},
    rank_trainer: {type: String, default: ''},
    rank_athlete: {type: String, default: ''},
    orderId: {type: String, default: ''},
    view: {type: Boolean, default: true},
    tmp: {type: Boolean, default: true}
})

module.exports = model('Peoples', Peoples);