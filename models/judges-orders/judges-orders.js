const {Schema, model} = require('mongoose');

const JudgesOrders = new Schema({
    dateOrder: {type: Date, default:Date.now},
    orderType: {type: String,default: '', trim: true},
    judges: [{type: Schema.Types.ObjectId, ref: 'Peoples'}],
    docs: {type: Object, default: []},
    view: {type: Boolean, default: true},
    tmp: {type: Boolean, default: true}
    },
    {timestamps: true}
)

module.exports = model('JudgesOrders', JudgesOrders);