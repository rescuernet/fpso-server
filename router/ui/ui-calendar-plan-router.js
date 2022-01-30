const Router = require('express').Router;
const uiCalendarPlanController = require('../../controllers/ui/ui-calendar-plan-controller');


const router = new Router();


router.get(`/competitions/calendar-plan`, uiCalendarPlanController.calendar_plan_get);



module.exports = uiCalendarPlanRouter = router;