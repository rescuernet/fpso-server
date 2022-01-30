const {Schema, model} = require('mongoose');

const Team = new Schema({
    year: {type: String, default: '', trim: true},
    text: {type: String, default: '', trim: true},
    docs: {type: Object,default:[]},
})

module.exports = model('Team', Team);