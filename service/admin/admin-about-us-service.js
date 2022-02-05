const AboutUsModel = require('../../models/about-us/about-us-model.js');
const FileCloud = require("../../function/file-cloud");

class adminAboutUsService {

    async about_us_get() {
        return AboutUsModel.findOne({}).lean();
    }

    async about_us_save(arr) {
        const res = arr.data.docs.map((i) => {
            if(i.title === ''){
                return {error: `Не указано название прикрепленного документа в разделе общих документов соревнования`}
            }
        }).filter(j => j)
        if(res.length) return res[0]

        try {
            if(arr.mediaDel && arr.mediaDel.length > 0){
                FileCloud.Delete(arr.mediaDel)
            }
            return await AboutUsModel.findOneAndUpdate({_id: arr.data._id}, arr.data);

        } catch (e) {
            return {error: `Что-то пошло не так... Обратитесь к разработчику. ${e}`}
        }
    }
}


module.exports = new adminAboutUsService();