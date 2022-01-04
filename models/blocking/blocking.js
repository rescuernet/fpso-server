const {Schema, model} = require('mongoose');

const blockings = new Schema({
    mediaDelTmp: {type: Boolean, default: false}
})

module.exports = model('blockings', blockings);