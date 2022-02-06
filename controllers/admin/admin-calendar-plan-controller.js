const adminCalendarPlanService = require('../../service/admin/admin-calendar-plan-service')
const FileUpload = require("../../function/file-cloud");


class adminCalendarPlanController {

    async calendar_plan_get(req, res, next) {
        try {
            const response = await adminCalendarPlanService.calendar_plan_get();
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async calendar_plan_docs_create(req, res, next) {
        if(req.file){
            try {
                await FileUpload.Upload(req.file.filename)
                return res.json({doc: req.file.filename});
            } catch (e) {
                next(e);
            }
        }else{
            return res.json({error: 'Ошибка загрузки'});
        }
    }

    async calendar_plan_save(req, res, next) {
        try {
            const response = await adminCalendarPlanService.calendar_plan_save(req.body);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new adminCalendarPlanController();