const {Schema,model} = require('mongoose');

const News = new Schema({
    avatar: {type: String,required:true},
    dateCreated: {type:Date, default: Date.now},
    dateStart: {type:Date, default: Date.now},
    dateEnd: {type:Date},
    headerFirst: {type:String,unique:true,required:true},
    headerSecond: {type:String},
    textMain: {type: String,required:true},
    images: {type: Object,default:[]}
})

module.exports = model('News',News);