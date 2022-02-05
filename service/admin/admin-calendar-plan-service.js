const CalendarPlanModel = require('../../models/calendar-plan/calendar-plan-model.js');
const FileCloud = require("../../function/file-cloud");

class adminCalendarPlanService {

    async calendar_plan_get() {
        return CalendarPlanModel.findOne({}).lean();
    }

    async calendar_plan_save(arr) {
        const res = arr.data.docs.map((i) => {
            if(i.title === ''){
                return {error: `Не указано название прикрепленного документа`}
            }
        }).filter(j => j)
        if(res.length) return res[0]

        try {
            if(arr.mediaDel && arr.mediaDel.length > 0){
                FileCloud.Delete(arr.mediaDel)
            }
            return await CalendarPlanModel.findOneAndUpdate({_id: arr.data._id}, arr.data);

        } catch (e) {
            return {error: `Что-то пошло не так... Обратитесь к разработчику. ${e}`}
        }
    }

}


module.exports = new adminCalendarPlanService();