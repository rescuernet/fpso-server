const RusadaModel = require('../../models/rusada/rusada-model.js');
const Yandex = require("../../function/file-cloud");

class adminRusadaService {

    async rusada_get() {
        return RusadaModel.findOne({}).lean();
    }

    async rusada_save(arr) {
        const res = arr.data.docs.map((i) => {
            if(i.title === ''){
                return {error: `Не указано название прикрепленного документа`}
            }
        }).filter(j => j)
        if(res.length) return res[0]

        try {
            if(arr.mediaDel && arr.mediaDel.length > 0){
                Yandex.DeleteFile(arr.mediaDel)
            }
            return await RusadaModel.findOneAndUpdate({_id: arr.data._id}, arr.data);

        } catch (e) {
            return {error: `Что-то пошло не так... Обратитесь к разработчику. ${e}`}
        }
    }
}


module.exports = new adminRusadaService();