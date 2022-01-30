const CalendarPlanModel = require("../../models/calendar-plan/calendar-plan-model");


class uiCalendarPlanController {

    async calendar_plan_get(req, res, next) {
        try {
            const data = await CalendarPlanModel.findOne({}).lean();
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new uiCalendarPlanController();