const {Schema,model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Competitions = new Schema({
    dateCreated: {type:Date, default: Date.now},
    dateStart: {type:Date, required:true},
    dateEnd: {type:Date, required:true},
    headerFirst: {type:String,unique:true,required:true,minlength:4,maxlength:255,trim:true},
    textMain: {type: String,required:true,minlength:5,trim:true},
    avatar: {type: String},
    images: {type: Object,default:[]},
    docs: {type: Object,default:[]},
    finished: {type: Boolean,default:false},
    published: {type: Boolean,default:false},
    winners: {type: Object,default:[]},
})

Competitions.plugin(mongoosePaginate);

module.exports = model('Competitions',Competitions);