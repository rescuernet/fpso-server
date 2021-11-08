const {Schema,model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const News = new Schema({
    dateCreated: {type:Date, default: Date.now()},
    dateStart: {type:Date, default: Date.now()},
    dateEnd: {type:Date},
    headerFirst: {type:String,unique:true,required:true,minlength:4,maxlength:255,trim:true},
    headerSecond: {type:String,maxlength:255,trim:true},
    textMain: {type: String,required:true,minlength:5,trim:true},
    fixedNews: {type: Boolean,default:false},
    importantNews: {type: Boolean,default:false},
    published: {type: Boolean,default:false},
    avatar: {type: String},
    images: {type: Object,default:[]},
    docs: {type: Object,default:[]}
})

News.plugin(mongoosePaginate);

module.exports = model('News',News);