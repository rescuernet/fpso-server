const {Schema,model} = require('mongoose');

const News = new Schema({
    dateCreated: {type:Date, default: Date.now},
    dateStart: {type:Date, default: Date.now},
    dateEnd: {type:Date},
    headerFirst: {type:String,unique:true,required:true},
    headerSecond: {type:String},
    textMain: {type: String}
})

module.exports = model('News',News);