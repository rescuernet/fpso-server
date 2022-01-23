const {Schema, model} = require('mongoose');

const AboutUs = new Schema({
    header: {type: String, default: '', trim: true},
    text: {type: String, default: '', trim: true},
    address: {type: String, default: '', trim: true},
    telephone: {type: String, default: '', trim: true},
    email: {type: String, default: '', trim: true},
    docs: {type: Object,default:[]},
    img: {type: Object,default:[]},
    tmp: {type: Boolean, default: true}
})

module.exports = model('AboutUs', AboutUs);