const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Competitions = new Schema(
    {
        dateStart: {type: Date},
        dateEnd: {type: Date},
        location: {type: String},
        headerFirst: {type: String, maxlength: 255, trim: true},
        textMain: {type: String, trim: true},
        avatar: {type: String},
        images: {type: Object, default: []},
        docs: {type: Object, default: []},
        published: {type: Boolean, default: false},
        winners: {type: Object},
        tmp: {type: Boolean, default: false}
    },
    {timestamps: true}
)

Competitions.plugin(mongoosePaginate);

module.exports = model('Competitions', Competitions);