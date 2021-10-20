const {Schema,model} = require('mongoose');

const News = new Schema({
    avatar: {type: String,required:true},
    dateCreated: {type:Date, default: Date.now},
    dateStart: {type:Date, default: Date.now},
    dateEnd: {type:Date},
    headerFirst: {type:String,unique:true,required:true,minlength:4,maxlength:255,trim:true},
    headerSecond: {type:String,maxlength:255,trim:true},
    textMain: {type: String,required:true,minlength:5,trim:true},
    fixedNews: {type: Boolean,default:false},
    importantNews: {type: Boolean,default:false},
    images: {type: Object,default:[]}
})

module.exports = model('News',News);