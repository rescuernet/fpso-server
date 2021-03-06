const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const News = new Schema(
    {
        dateStart: {type: Date},
        dateEnd: {type: Date, default: ''},
        headerFirst: {type: String, maxlength: 255, trim: true},
        textMain: {type: String, trim: true},
        fixedNews: {type: Boolean, default: false},
        importantNews: {type: Boolean, default: false},
        published: {type: Boolean, default: false},
        avatar: {type: String, trim: true},
        images: {type: Object, default: []},
        docs: {type: Object, default: []},
        tmpNews: {type: Boolean, default: false},
    },
    {timestamps: true}
)

News.plugin(mongoosePaginate);

module.exports = model('News', News);