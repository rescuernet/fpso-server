const CompModel = require('../../models/competitions/competitions-model.js');

const dateFns = require("date-fns")

class uiCompService {
    compModel
   constructor( CompModel) {
        this.compModel = CompModel
   }
    async getComp(page = 1,limit = 10) {
        const date = dateFns.format(new Date(Date.now()), 'yyyy-MM-dd')
        const query = {
            published: true,
            tmp: false,
            /*dateStart: {$lte: date}*/
        }
        const options = {
            page: page,
            limit: limit,
            sort: {
                dateStart: -1,
                createdAt: -1,
            },
            populate: 'location'
        }
        return  this.compModel.paginate(query, options, function(err, result) {
            return result
        });
    }

    async getCompId(id) {
        return  this.compModel.findById(id).populate('location');
    }
}


module.exports = new uiCompService(CompModel);